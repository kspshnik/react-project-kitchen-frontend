import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { calculateOffset } from '../../services/helpers';
import { UserArticlesTypes } from '../../types/types';
import ArticleList from '../ArticleList';
import EditProfileSettings from './edit-profile-settings';
import FollowUserButton from './follow-user-button';
import UserArticles from './UserArticles';
import ProfileFavorites from './ProfileFavorites';
import {
  followProfileThunk,
  getPublicFeedThunk,
  getUserProfileThunk,
  unfollowProfileThunk,
} from '../../thunks';
import { clearView } from '../../store';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(
    (state) => state.view.profile,
  )
    ?? {
      username: '',
      following: false,
      email: '',
      bio: '',
      image: '',
    };
  const isUser = useSelector(
    (state) => !!state.profile.username
      && !!state.profile.email
      && (state.profile.username === state.view.profile?.username),
  );
  const { page, perPage, articlesType } = useSelector((state) => state.view);
  const params = useParams<{ username: string }>();

  useEffect(() => {
    dispatch(getUserProfileThunk(params.username));

    return () => {
      dispatch(clearView());
    };
  }, [dispatch, params.username]);

  useEffect(() => {
    switch (articlesType) {
      case UserArticlesTypes.my: {
        dispatch(getPublicFeedThunk({
          offset: calculateOffset(page, perPage),
          limit: perPage,
          author: params?.username,
        }));
        break;
      }
      case UserArticlesTypes.favorite: {
        dispatch(getPublicFeedThunk({
          offset: calculateOffset(page, perPage),
          limit: perPage,
          favorited: params?.username,
        }));
        break;
      }
      default: throw new TypeError('Несоответствующий тип фида!');
    }
  }, [dispatch, page, articlesType, perPage, params?.username]);

  const onFollow = () => {
    dispatch(followProfileThunk());
  };

  const onUnfollow = () => {
    dispatch(unfollowProfileThunk());
  };

  return (
    <div className='profile-page'>

      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>

              <img src={profile?.image} className='user-img' alt={profile?.username} />
              <h4>{profile?.username}</h4>
              <p>{profile?.bio}</p>

              <EditProfileSettings isUser={isUser} />
              <FollowUserButton
                isUser={isUser}
                user={profile}
                follow={onFollow}
                unfollow={onUnfollow} />

            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>

          <div className='col-xs-12 col-md-10 offset-md-1'>

            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <UserArticles />
                <ProfileFavorites />
              </ul>
            </div>

            <ArticleList />
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;
