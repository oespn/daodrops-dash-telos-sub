import { supabase } from '../../../utils/supabaseClient'

// /api/user/page/0
// http://localhost:3000/api/user/page?=1

const tagRandom = [
  "dev,ux,promote",
  "ux,promote",
  "promote",
  "",
  "design,promote",
]

export default async function handler(req, res) {
  try {
    const { from = 0, to = 10, searchString = '' } = req.query;

    let { data, error, status, count } = await supabase
      .from('dao_people')
      .select(`rank, username, eth_address, twitter_name, bio, profile_image_url, proposals, votesCount, daosCount, tags, id`, { count: 'exact' })
      .neq('twitter_name', null) // illustration
      .ilike('username', `%${searchString}%`)
      .range(from, to)

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      for (let i = 0; i < data.length; i++) {
        const el = data[i];
        el['tags'] = tagRandom[el['rank'] % 5];
      }
      res.status(200).json({ data, count });
    }
  } catch (error) {
    res.status(200).json({
      //search: req,
      result: error
    });
  }
}
