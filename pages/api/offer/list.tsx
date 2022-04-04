import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res) {
  try {
    const { from = 0, to = 10, searchString = '' } = req.query;

    let { data, error, status, count } = await supabase
      .from('offers_invitelist')
      .select(`
        *, offers!inner(*)
      `, { count: 'exact' })

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      res.status(200).json({ data, count });
    }
  } catch (error) {
    res.status(200).json({
      //search: req,
      result: error
    });
  }
}
