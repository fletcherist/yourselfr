import React from 'react';
import s from './WriteBox.scss';
import { connect } from 'react-redux';
import { actions as postsActions } from '../../redux/modules/posts';

class WriteBox extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        text: '',
        created_by: this.props.alias
      }
    }

    handleSubmitButton (e) {
      var text = this.textBox.value;
      this.props.sendPost(text);

      this.textBox.value = '';
    }

    selectPhoto (e) {
      this.photoInput.click();
    }

    attachPhoto (e) {
      var photo = this.photoForm;
      console.log(photo);
      var fd = new FormData();
      fd.append('file', photo[0].files[0]);

      var file = photo[0].files[0];

      var preview = document.getElementById('attach-preview');
      var reader = new FileReader();

      reader.onload = function () {
        console.log('dgsddsgds');
        // Create a new image.
        var img = new Image();
        // Set the img src property using the data URL.
        formToTray();
        preview.src = reader.result;
        preview.classList.remove('hidden');
      }

      if (photo[0].files[0]) {
        reader.readAsDataURL(photo[0].files[0]);
      } else {
        console.log('not working');
        preview.src = '';
      }

      function formToTray () {
        var form = document.getElementById('textForm');
        form.style.width = '60%';
      }
    }

    render () {
      return (
            <div className={s.container}>
                <textarea
                    placeholder='Оставьте мнение о Ване'
                    id='textForm'
                    ref={(ref) => this.textBox = ref}
                >
                </textarea>
                <img id='attach-preview' className={s.attachPreview}/>
                <div className={s.above}>
                    <button
                        className='btn btn-yo'
                        onClick={this.handleSubmitButton.bind(this)}>
                        оставить мнение
                    </button>
                    <div className={s.addPhoto} onClick={this.selectPhoto.bind(this)}></div>
                    <form ref={ (r) => this.photoForm = r } id='attach-photo' encType='multipart/form-data' method='post' className={s.attachForm}>
                        <input type='file' name='photo' onChange={this.attachPhoto.bind(this)} ref={ (r) => this.photoInput = r } id='attach-input' className='attachPhoto-input'/>
                    </form>
                </div>
            </div>
        );
    }
}

WriteBox.propTypes = {
  sendPost: React.PropTypes.func.isRequired,
  alias: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps, postsActions)(WriteBox);
