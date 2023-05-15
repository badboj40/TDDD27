import { auth } from '../Firebase/Firebase';
import axios from 'axios';
import {
  addItemToWatchlist,
  addItemToSeenlist,
  removeItemFromWatchlist,
  removeItemFromSeenlist
} from '../store';

export const handleListAction = async (actionType, url, id, dispatch, payload) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated.');
    }

    const idToken = await user.getIdToken(true);
    const config = {
      method: actionType,
      url: url,
    };

    if (actionType === 'delete') {
      config.headers = {
        Authorization: idToken
      };
      config.url += id ? `/${id}` : '';
    } else if (actionType === 'post') {
      config.data = {
        idToken: idToken,
        ...payload
      };
    } else {
      throw new Error('Invalid action type.');
    }

    await axios(config);

    if (actionType === 'post') {
      if (url.includes('addWatchlistItem')) {
        dispatch(addItemToWatchlist(id));
      } else if (url.includes('addSeenlistItem')) {
        dispatch(addItemToSeenlist(id));
      }
    } else if (actionType === 'delete') {
      if (url.includes('removeWatchlistItem')) {
        dispatch(removeItemFromWatchlist(id));
      } else if (url.includes('removeSeenlistItem')) {
        dispatch(removeItemFromSeenlist(id));
      }
    }
  } catch (error) {
    console.error(error);
  }
};



export const AddToWatchlist = (key_value, dispatch) => {
  const url = `http://${window.location.host}/addWatchlistItem`;
  const payload = {
    movie: key_value[1]
  };
  handleListAction('post', url, key_value[1], dispatch, payload);
};

export const AddToSeenlist = (key_value, dispatch) => {
  const url = `http://${window.location.host}/addSeenlistItem`;
  const payload = {
    movie: key_value[1]
  };
  handleListAction('post', url, key_value[1], dispatch, payload);
};

export const RemoveFromWatchlist = (movieId, dispatch) => {
  const url = `http://${window.location.host}/removeWatchlistItem`;
  handleListAction('delete', url, movieId, dispatch);
};

export const RemoveFromSeenlist = (movieId, dispatch) => {
  const url = `http://${window.location.host}/removeSeenlistItem`;
  handleListAction('delete', url, movieId, dispatch);
};

