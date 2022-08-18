const drawerWidth = 240
const styles = theme => ({
  wrapadmin: {
    top: '64px',
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  },
  menuLinkActive: {
    '&>div': {
      backgroundColor: '#4287f5',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#6e98dc',
      },
    },
  },
})
export default styles
