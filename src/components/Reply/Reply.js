import React from 'react'
import ReplyIcon from 'material-ui/svg-icons/content/reply'
import { palette } from 'store/config'

const styles = {
  div: {
    display: 'inline-block'
  },
  icon: {
    color: palette.yoColor,
    height: '40px'
  }
}
const Reply = () => (
  <div style={styles.div}>
    <ReplyIcon
      color={palette.grey}
      hoverColor={palette.yoColor}
    />
  </div>
)

export default Reply
