import Dropzone from "react-dropzone-uploader"
import 'react-dropzone-uploader/dist/styles.css'
import { supabase } from '../../../utils/supabaseClient'

const UploadGallery = (props) => {
  const {
    setImages
  } = props

  const getUploadParams = ({ meta }) => {
    const url = 'https://httpbin.org/post'
    return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = async (files, allFiles) => {
    let urls = []

    for (let i = 0; i < files.length; i ++) {
      const timestamp = Date.now()
      const file = files[i]
      const filename = timestamp + file.meta.name
      const { data, error } = await supabase.storage
        .from('gallery')
        .upload(filename, file.file, { contentType: file.meta.type })

      if (data) {
        var { Key } = data
      }

      const { publicURL } = supabase
        .storage
        .from('gallery')
        .getPublicUrl(filename)

      urls.push({
        filename,
        publicURL
      })
    }

    setImages(urls)

    allFiles.forEach(f => f.remove())
  }

  const CustomSubmitButtonComponent = ({props}) => {
    return (
      <p>Upload to Gallery</p>
    )
  }

  return (
    <Dropzone
      submitButtonContent={ props => 'Upload to gallery'}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    />
  )
}


export default UploadGallery;