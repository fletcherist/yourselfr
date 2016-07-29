import React, { Component } from 'react'
import { config } from '../../store/config'
import s from './WriteBox.scss'

class AttachPhoto extends Component {
  shouldComponentUpdate (nextProps) {
    return true
  }

  selectPhoto (e) {
    this.photoInput.click()
  }

  attachPhoto (e) {
    var photo = this.photoForm
    console.log(photo)
    var fd = new FormData()
    fd.append('file', photo[0].files[0])

    var preview = document.querySelector('#attach-preview')
    // var attachBlock = document.querySelector('#attach-block')
    var reader = new FileReader()

    reader.onload = function () {
      var background = document.querySelector('#background')
      background.style.background = `url(${reader.result})`
      // preview.src = reader.result;
      // attachBlock.classList.remove('hidden');
    }

    if (photo[0].files[0]) {
      reader.readAsDataURL(photo[0].files[0])
    } else {
      console.log('not working')
      preview.src = ''
    }

    fetch(`${config.http}/upload/photo`, {
      method: 'post',
      body: fd
    })
    .then((r) => r.json())
    .then((res) => {
      document.querySelector('#input-value').value = res.url
      console.log(document.querySelector('#input-value').value)
    })
    .catch((e) => {
      console.log('Error catched while attaching a photo', e)
    })
  }

  render () {
    return (
      <div className={s.photoHolder} onClick={this.selectPhoto.bind(this)}>
        <div className={s.photoTitle}>Прикрепить</div>
        <div className={s.addPhoto}></div>
        <form ref={(r) => this.photoForm = r} encType='multipart/form-data' method='post' className={s.attachForm}>
          <input type='file' onChange={this.attachPhoto.bind(this)} ref={(r) => this.photoInput = r} />
          <input id='input-value' />
        </form>
      </div>
    )
  }
}

export default AttachPhoto
