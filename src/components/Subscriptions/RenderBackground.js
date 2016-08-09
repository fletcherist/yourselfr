import React from 'react'
import { config } from 'store/config'
import s from './Subscriptions.scss'

const RenderBackground = subscription => {
  if (subscription.background) {
    return (
      <div style={{background:
      `url(${config.http}/upload/background_cropped/${subscription.background})`
      }}
        className={s.background}>
      </div>
    )
  }
  return null
}

export default RenderBackground
