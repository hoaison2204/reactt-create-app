export default {
  $_downloadPdfUrlMixin(fileUrl) {
    console.log('download pdf')
    if (!fileUrl) {
      this.$toasted.error('fileUrl null')
      return
    }
    //Set the File URL.s
    // const fileUrl = 'https://www.clickdimensions.com/links/TestPDFfile.pdf'
    //Create XMLHTTP Request.
    let filenamePdf = null
    if (fileUrl) {
      const filename1 = fileUrl.split('/')
      if (filename1.length > 0) {
        const filename2 = filename1[5]
        if (filename2) {
          const filename3 = filename2.split('?')
          // console.log('filename3: ', filename3[0])
          filenamePdf = filename3[0]
        }
      }
    }
    const req = new XMLHttpRequest()
    req.open('GET', fileUrl, true)
    req.responseType = 'blob'
    req.onload = function () {
      //Convert the Byte Data to BLOB object.
      const blob = new Blob([req.response], { type: 'application/octetstream' })
      // //Check the Browser type and download the File.
      const isIE = false || !!document.documentMode
      if (isIE) {
        window.navigator.msSaveBlob(blob, filenamePdf)
      } else {
        const url = window.URL || window.webkitURL
        const link = url.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('download', filenamePdf)
        a.setAttribute('href', link)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }
    req.onerror = function () {
      const anchor = document.createElement('a')
      // Append to the DOM
      window.open(fileUrl, '_blank')
      document.body.appendChild(anchor)
      // Trigger `click` event
      anchor.click()
      // Remove element from DOM
      document.body.removeChild(anchor)
    }
    req.send()
  }
}
