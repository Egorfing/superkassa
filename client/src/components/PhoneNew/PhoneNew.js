import PhoneList from '../PhoneList/PhoneList';
import React, { useEffect, useRef, useState } from 'react';

function PhoneNew(props) {

  const phone = useRef()
  const code = useRef()
  const [allPhones, setAllPhones] = useState([])

  const socket = new WebSocket('ws://localhost:5000/new')

  socket.onmessage = (e) => {
    setAllPhones(JSON.parse(e.data))
  }
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(res => setAllPhones(res))

  }, [])


  function formHandler(e) {
    e.preventDefault()

    const phoneNumber = code.current.value + ' ' + phone.current.value
    socket.send(JSON.stringify({ phoneNumber }))
    phone.current.value = ''
    code.current.value = '+7'

  }

  return (
    <div>
      <form className="row gy-2 gx-3 align-items-center" onSubmit={formHandler}>
        <div className="col-auto">
          <label className="visually-hidden" htmlFor="autoSizingSelect">Код страны</label>
          <select ref={code} className="form-select" id="autoSizingSelect">
            <option value="+7">Россия +7</option>
            <option value="+44">Англия +44</option>
            <option value="+34">Испания +34</option>
          </select>
        </div>
        <div className="col-auto">
          <label className="visually-hidden" htmlFor="autoSizingInput">Номер телефона</label>
          <input ref={phone} type="text" className="form-control" id="autoSizingInput" pattern='[0-9]{3,10}' title='от 3-х до 10-ти цифр!' placeholder="номер телефона" />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Добавить</button>
        </div>
      </form>
      <PhoneList phones={allPhones} />
    </div>
  );
}

export default PhoneNew;
