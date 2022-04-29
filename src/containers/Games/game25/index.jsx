import React, { useEffect, useState } from 'react';
import '@/scss/game-25.scss';
import Constant from '@/Scripts/Constants';

const Game25 = () => {

  let defaultPointsCount = 10;
  const holdEdge = 0;
  const increaseEdge = 1;
  const decreaseEdge = -1;

  const [tableEdges, setTableEdges] = useState([]);
  const [sumPoints, setSumPoints] = useState(defaultPointsCount)
  const [currentPoint, setCurrentPoint] = useState(null);

  useEffect(() => {
    setTableEdges(Constant.gameTable);
  }, [])

  const getTypeData = (type) => {
    if (type === 'HOLD') {
      return { icon: 'ac_unit', point: 0 };
    } else if (type === 'INCREASE') {
      return { icon: 'add_circle', point: 1 };
    } else if (type === 'DECREASE') {
      return { icon: 'remove', point: -1 };
    } else if (type === 'PRIZE') {
      return { icon: 'redeem', point: 'win' };
    }
  };

  const selectItem = (item) => {
    if (!currentPoint) {
      setCurrentPoint(defaultPointsCount)
    } else {
      if (typeof getTypeData(item).point === 'number') {
        let localDef = currentPoint + (getTypeData(item).point);
        console.log(defaultPointsCount, localDef);
        setSumPoints(localDef);
        setCurrentPoint(localDef);
      }
    }
  };

  return (
    <main className="container main_area main-column ideas-page">

      <h4>Points: {sumPoints}</h4>

      {currentPoint > 0 || !currentPoint ?
        <div className="game-field">
          {tableEdges.length > 0 && tableEdges.map((edge, index) =>
            <div className="game-field__item centered-text" key={index} onClick={() => selectItem(edge.type)}>
              <i className='material-icons'>{getTypeData(edge.type).icon}</i>
            </div>
          )
          }
        </div>
        :
        <div className=''>
          <div>Game over</div>
          <button className="action-btn success mobile100"></button>
        </div>
      }

    </main>
  )

}

export default Game25