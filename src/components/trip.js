const React = require('react');
const { connect } = require('react-redux');
const Dropdown = require('./dropdown.js');
const { toggleDropdown } = require('../actions/action-creators.js')

const Trip = ({ handleClick, dropdown, id, title, description, start_date, end_date, photo_url }) => {

  const addPhoto = (element) => {
    if (!element) return;
    element.style.backgroundImage = 'url(' + photo_url + ')';
  }

  return (
    <div className='trip' ref={addPhoto}><div className='layer'>
      <span className='dropdown lnr lnr-chevron-down' onClick={handleClick}/>
      { dropdown && <Dropdown id={id}/> }
      <h3>{ title }</h3>
      <p>{ description }</p>
      <p>{ start_date } - { end_date }</p>
    </div></div>
  )

}

Trip.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  dropdown: React.PropTypes.bool.isRequired,
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  start_date: React.PropTypes.string.isRequired,
  end_date: React.PropTypes.string.isRequired,
  photo_url: React.PropTypes.string.isRequired
}

const mapStateToProps = ({ calendar }, { index }) => ({ dropdown: calendar.dropdowns[index] })

const mapDispatchToProps = (dispatch, { index }) => ({
  handleClick: (event) => {
    event.stopPropagation();
    dispatch(toggleDropdown(index))
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Trip);
