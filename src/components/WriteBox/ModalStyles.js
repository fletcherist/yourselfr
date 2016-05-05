const ModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    overflowY: 'hidden'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    border: 'none',
    height: '400px',
    minWidth: '500px',
    background: 'transparent',
    overflow: 'auto',
    WebkitOverflowScrolling: 'auto',
    marginRight: '-50%',
    transform: 'translate(-51%, -50%)',
    trasnition: 'opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25), -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25)'
  }
}

export default ModalStyles;
