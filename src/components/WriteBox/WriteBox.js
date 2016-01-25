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
    attachPhoto (e) {
    }

    render () {
      return (
            <div className={s.container}>
                <textarea
                    placeholder='Оставьте мнение о Ване'
                    ref={(ref) => this.textBox = ref}
                >
                </textarea>
                <img id='attach-preview' className='attach-preview hidden'/>
                <div className={s.above}>
                    <button
                        className='btn btn-yo'
                        onClick={this.handleSubmitButton.bind(this)}>
                        оставить мнение
                    </button>
                    <div className={s.addPhoto}> </div>
                    <form id='attach-photo' encType='multipart/form-data' method='post' className={s.attachForm}>
                        <input type='file' name='photo' onChange={this.attachPhoto} id='attach-input' className='attachPhoto-input'/>
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
