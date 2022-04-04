import { supabase } from '../../utils/supabaseClient'


export default async function handler(req, res) {
  try {
    const { id } = req.query;

    let { data, error, status } = await supabase
      .from('targetlist')
      .select()
      .eq('id', `${id}`)
      .single()

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      res.status(200).json({ data: data.targets.lists })
    }
  } catch (error) {
    res.status(200).json({
      search: req,
      result: error
    });
  } 
}
