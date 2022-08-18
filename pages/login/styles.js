import { red } from '@material-ui/core/colors'

const styles = theme => ({
  background: {
    backgroundColor: theme.palette.primary.main,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    flex: '1 0 auto',
  },
  error: {
    color: '#f00',
    textAlign: 'left',
  },
  login: {},
  title: {
    display: 'inline-block',
    marginBottom: '10px',
  },
})
export default styles
