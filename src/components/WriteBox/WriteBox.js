import React from 'react';
import s from './WriteBox.scss';



class WriteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            created_by: this.props.alias
        }
    }

    render() {
        return (
            <div className={s.container}>
                <textarea
                    placeholder="Оставьте мнение о Ване"
                    ref={(ref) => this.textBox = ref}
                >
                </textarea>
                <img id="attach-preview" className="attach-preview hidden"/>
                <div className={s.above}>
                    <button
                        className="btn btn-yo">
                        оставить мнение
                    </button>
                    <div className={s.addPhoto}> </div>
                    <form id="attach-photo" encType="multipart/form-data" method="post" className={s.attachForm}>
                        <input type="file" name="photo" onchange="attachPhoto()" id="attach-input" className="attachPhoto-input"/>
                    </form>
                </div>
            </div>
        );
    }
}

WriteBox.propTypes = {
  alias: React.PropTypes.string.isRequired
}

export default WriteBox;
