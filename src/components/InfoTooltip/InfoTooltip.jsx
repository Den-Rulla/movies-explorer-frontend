import './InfoTooltip.css';

export default function InfoTooltip({ openToolTip, setOpenToolTip, toolTipText, toolTipErr }) {

  function handleClose() {
    setOpenToolTip(false);
  }

  return (
    <div className={`tooltip ${toolTipErr ? 'tooltip_type_error' : ''} ${openToolTip ? 'tooltip_opened' : ''}`}>
      <button className='tooltip__close-btn' onClick={handleClose} />
      <p className='tooltip__text'>{toolTipText}</p>
    </div>
  );
}
