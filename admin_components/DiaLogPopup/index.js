import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import PropTypes from 'prop-types'
import { createRef } from 'react'
export default function DiaLogPopup(props) {
  const wrapper = createRef()
  const { message, onDialog, isOpenDiaLog } = props
  return (
    <Dialog
      ref={wrapper}
      open={isOpenDiaLog}
      onClose={() => onDialog(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={() => onDialog(false)}>Không đồng ý</Button>
        <Button onClick={() => onDialog(true)} autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DiaLogPopup.propTypes = {
  message: PropTypes.string.isRequired,
  onDialog: PropTypes.func.isRequired,
  isOpenDiaLog: PropTypes.bool.isRequired,
}
