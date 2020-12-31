/** @jsx jsx */
import React, { useState } from 'react'
import { css} from '@emotion/react'
import { jsx } from '@emotion/react'
import logo from '../../assets/logo.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
/**
 * @function Sidebar
 */
const Sidebar = () => {
  const [state, setState] = useState({
    currentPlaylist: 'home',
    playlists: {
      home: null,
      favorites: null
    }
  })

  const playlists = Object.keys(state.playlists)

  return (
    <ul className="Sidebar" css={CSS}>
     <AccountCircleIcon />

      <li className="library">Library</li>

      {playlists.map(list => (
        <li
          key={list}
          className={list === state.currentPlaylist ? 'active' : ''}
          onClick={() => {
            setState({ ...state, currentPlaylist: list })
          }}
        >
          {list}
        </li>
      ))}

      <li className="new-playlist">
        <i className="fa fa-plus-circle" />
        <span>New Playlist</span>
      </li>
    </ul>
  )
}

const CSS = css`
width: 200px;
  height: 100%;
  background: #0f121a;
  padding: 20px;

  img {
    height: 50px;
    padding-left: 25px;
    margin-bottom: 20px;
  }
  li {
    padding-left: 20px;
    text-transform: capitalize;
    margin-bottom: 10px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      color: #64edff;
    }
  }
  li.active {
    border-left: 2px solid #64edff;
    padding-left: 18px;
    color: #64edff;
  }
  li.library {
    cursor: unset;
    color: #999;
    text-transform: uppercase;
    font-weight: normal;
  }
  li.new-playlist {
    position: absolute;
    bottom: 80px;
    i {
      margin-right: 5px;
      transform: translateY(1px);

      &:before {
        font-size: 20px;
      }
    }

    span {
      color: #999;
      font-weight: 300;
      &:hover {
        color: #64edff;
      }
    }
  }

  form {
    button {
      background-color: #07111f;
      color: #64edff;
      padding: 13px 30px;
      border-radius: 5px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
      border: 2px solid #64edff;
      cursor: pointer;
      &:hover {
        background-color: rgba(100, 237, 255, 0.15);
      }
    }

    .title {
      margin: 0;
      margin-bottom: 35px;
    }

    input {
      margin-bottom: 20px;
      height: 40px;
      padding-left: 8px;
      font-size: 16px;
      width: 100%;
      color: white;
      border-radius: 5px;
      border: none;
      background-color: #303c55;
    }

    .content-wrap {
      margin: 0px auto;
      max-width: 250px;
      text-align: center;
    }
  }
`

export default Sidebar