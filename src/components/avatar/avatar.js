import React from 'react';
import avatarImg from '../../static/images/Avatar.jpg';
import './avatar.scss';

export default class Avatar extends React.Component {

    render () {

        return (
            <div className="avatar">
                <div className="avatar-img">
                    <img src={avatarImg} />
                </div>
            </div>
        );

    }

}