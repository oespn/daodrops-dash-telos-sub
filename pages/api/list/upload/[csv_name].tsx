import { supabase } from '../../../../utils/supabaseClient'

// domain.com/api/list/upload/csv_name

export default async function handler(req, res) {
  
   
    console.log('req keyword:', req.query.csv_name);

    const datestamp = new Date().toISOString();
    const filename = req.query.csv_name + "_"+datestamp;
   

    const documentsFromCSV = req?.body?.csv;
    console.log('CSV:', documentsFromCSV);
    console.log('filename:', filename);


    const user_id = localStorage.getItem('user')
    const resDb = await supabase
      .from('targetlist')
      .insert([
        {
          created_by: user_id,
          name: filename,
          description: `Import from: ${filename}` ,
          targets: {
            lists: documentsFromCSV
          }
        }
      ])

    if (resDb.error) {
      //change to 400 after testing 
      res.status(200).json({result: resDb.error});
    } else {
      res.status(200).json({result: "Success!"});
      req.send({
        message: `Successfully created`,
        type: 'success'
      });
    }
  
}