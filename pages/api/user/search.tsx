import { supabase } from '../../../utils/supabaseClient'


export default async function handler(req, res) {
  try {
    let { data, error, status } = await supabase
      .from('dao_people')
      .select()
      .ilike('username', `%${req.query.username}%`)
      .single()

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(200).json({
      search: req,
      result: error
    });
  } 
}
