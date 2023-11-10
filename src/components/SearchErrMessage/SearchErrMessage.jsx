import './SearchErrMessage.css';

export default function SearchErrMessage ({ text }) {

  return (
    <div className='search-result-message'>
      <p className='search-result-message__text'>{text}</p>
    </div>
  )
}
