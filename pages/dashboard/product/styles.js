const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  thumbnail: {
    width: '100px',
    maxHeight: '100px'
  },
  tbHeadLeft: {
    width: '400px',
    background: '#f9f9f9',
    border: '1px solid #e5e5e5',
  },
  tbNameStyle: {
    maxWidth: '350px',
  },
  imgList: {
    maxWidth: '800px',
    maxHeight: '260px'
  },
  imgListItem: {
    position: 'relative',
    width: '16.66%',
    float: 'left',
    paddingLeft: '10px',
    margin: '0 0 11px',
    boxSizing: 'border-box',
    '&:first-child': {
      width: '33.33%',
    }
  },
  imgListItemBlock: {
    display: 'block !important',
  },
  imgUpload: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '128px',
    minHeight: '128px',
    border: '1px dashed #d0d5dd',
    borderRadius: '4px',
  },
  imgUploadText: {
    position: 'relative',
    width: '100%',
    height: '128px',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      bottom: '-1px',
      left: '-1px',
      right: '-1px',
      border: '1px dashed #d0d5dd',
      zIndex: 1,
      borderRadius: '4px',
      cursor: 'pointer',
    }
  },
  deleteImg: {
    display: 'block',
    position: 'absolute',
    right: 0,
    top: 0,
    cursor: 'pointer',
  },
  inputStyle: {
    width: '18px',
    height: '18px',
    border: '1px solid #ccc',

    '&.[type=checkbox]': {
      position: 'relative',
      cursor: 'pointer',

      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '16px',
        height: '16px',
        top: 0,
        left: 0,
        border: '2px solid #555555',
        borderRadius: '3px',
        backgroundColor: 'white',
      }
    }
  },
});

export default styles;