import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { increaseTimer, setTimerToReducer, lapTimer } from "../actions";

const SetTimer = ({
  Ctimer,
  increaseTimer,
  setTimerToReducer,
  lapTimers,
  lapTimer,
}) => {
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [isStart, setIsStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [stop, setStop] = useState(false);
  /*
  useEffect(() => {
    if (isStart) {
      var timerInterval = setInterval(countDown, 1000);
      if (timer.minutes === 0 && timer.seconds === 0) {
        setIsStart(false);
        clearInterval(timerInterval);
      } else {
        setIsStart(true);
      }
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isStart, timer]);
  */

  useEffect(() => {
    if (
      !(Ctimer.minutes === 0 && Ctimer.seconds === 0) &&
      isStart &&
      !reset &&
      !stop
    ) {
      var timerInterval = setInterval(increaseTimer, 1000);
      setTimer(Ctimer);
    } else if (Ctimer.minutes === 0 && Ctimer.seconds === 0) {
      setTimer(Ctimer);
      clearInterval(timerInterval);
    } else if (reset || stop) {
      clearInterval(timerInterval);
    }
    return () => {
      setReset(false);
      clearInterval(timerInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart, Ctimer]);

  const raiseTimer = () => {
    if (timer.seconds === 59) {
      if (timer.minutes === 59) {
        setTimer({
          minutes: 0,
          seconds: 0,
        });
      } else {
        setTimer({
          minutes: timer.seconds + 1,
          seconds: 0,
        });
      }
    } else {
      setTimer({ ...timer, seconds: timer.seconds + 1 });
    }
  };

  const lowerTimer = () => {
    if (!(timer.minutes === 0) || !(timer.seconds === 0)) {
      if (timer.seconds === 0) {
        setTimer({
          minutes: timer.minutes - 1,
          seconds: 59,
        });
      } else {
        setTimer({
          ...timer,
          seconds: timer.seconds - 1,
        });
      }
    }
  };

  const startTimer = () => {
    setStop(false);
    setTimerToReducer(timer);
    setIsStart(true);
  };

  const handleLapTimer = () => {
    lapTimer(timer);
  };

  const handleReset = () => {
    setStop(false);
    setReset(true);
    setTimer({ minutes: 0, seconds: 0 });
    setTimerToReducer(timer);
  };

  const handleStop = () => {
    setStop(true);
  };

  return (
    <div>
      <div className="setTimer-container">
        <div className="timer-information-container">
          <div className="font-size-25">{timer.minutes}:</div>
          <div className="font-size-25">{timer.seconds}</div>
        </div>
        <div className="timer-button-container">
          <button onClick={raiseTimer} className="timer-button">
            +
          </button>
          <button onClick={startTimer} className="timer-button">
            Start
          </button>
          <button onClick={handleStop} className="timer-button">
            Stop
          </button>
          <button onClick={handleLapTimer} className="timer-button">
            Lap
          </button>
          <button onClick={handleReset} className="timer-button">
            Reset
          </button>
          <button onClick={lowerTimer} className="timer-button">
            -
          </button>
        </div>
      </div>
      <div className="lap-timers-container">
        {lapTimers.map((item, index) => {
          return (
            <div key={index} className="lap-item-container font-size-25">
              {item.minutes}:{item.seconds}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Ctimer: state.timer, lapTimers: state.lapTimers };
};

export default connect(mapStateToProps, {
  increaseTimer,
  setTimerToReducer,
  lapTimer,
})(SetTimer);
