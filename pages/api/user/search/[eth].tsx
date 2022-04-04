import { supabase } from '../../../../utils/supabaseClient'


// /api/user/search/0x51cb9d27b98a84318859704c1af63088ab86592e


export default async function handler(req, res) {

  try {
  
    console.log('req whole:', req);
    console.log('req keyword:', req.query);

    let { data, error, status } = await supabase
      .from('dao_people')
      .select(`rank, username, eth_address, twitter_name, bio, daosCount, page_url`)
      .textSearch('eth_address', req.query.eth as string)

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      res.status(200).json({ data })
    }
  } catch (error) {
    res.status(200).json({
      search: req,
      result: error
    });
  } 

  
}