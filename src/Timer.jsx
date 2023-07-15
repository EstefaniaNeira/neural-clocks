import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';

const WorkTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);

  useEffect(() => {
    let interval = null;

    // Lógica para el temporizador
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonte el componente
  }, [isRunning]);


  useEffect(() => {
    handleReset();
  }, []); // Se ejecuta al cargar la vista

  const handleToggle = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning); // Alternar botones entre Play/Pause
  };

  const handleReset = () => {
    setTime(workMinutes * 60); // Restablecer el tiempo al valor inicial
    setIsRunning(false); // Detener el temporizador
  };

  const handleSliderChange = (event, newValue) => {
    setWorkMinutes(newValue); // Actualizar la duración del trabajo
    setTime(newValue * 60); // Actualizar el tiempo restante
  };

  const minutes = Math.floor(time / 60); // Calcula los minutos restantes
  const seconds = time % 60; // Calcula los segundos restantes

  const percentage = ((workMinutes * 60 - time) / (workMinutes * 60)) * 100; // Calcula el porcentaje de progreso

  return (
    <section>
      <h1 style={{ textAlign: 'center', fontFamily: 'Niramit' }}>Work</h1> {/* Título del temporizador */}
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`} // Muestra el tiempo restante en el texto del CircularProgressbar
        styles={buildStyles({
          pathColor: "#30252e",
          trailColor: "#ffd1ff",
          textColor: "#30252e",
        })}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={handleToggle}>
          {isRunning ? (
            <PauseCircleRoundedIcon style={{ fontSize: "5em", color: "#30252E" }} />
          ) : (
            <PlayCircleFilledIcon style={{ fontSize: "5em", color: "#30252E" }} />
          )}
        </button>
        <button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={handleReset}>
          <ChangeCircleRoundedIcon style={{ fontSize: "5em", color: "#30252E" }} />
        </button>
      </div>

      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Work Timer"
          value={workMinutes}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          size="medium"
          step={5}
          marks
          min={5}
          max={60}
          color="primary"
          sx={{ color: "#8E698E" }} // Modificar el color del Slider
        />
      </Box>
    </section>
  );
};

const BreakTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breakMinutes, setBreakMinutes] = useState(5);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    handleReset();
  }, []);

  const handleToggle = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setTime(breakMinutes * 60);
    setIsRunning(false);
  };

  const handleSliderChange = (event, newValue) => {
    setBreakMinutes(newValue);
    setTime(newValue * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const percentage = ((breakMinutes * 60 - time) / (breakMinutes * 60)) * 100;

  return (
    <section>
      <h1 style={{ textAlign: 'center', fontFamily: 'Niramit' }}>Break</h1>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
        styles={buildStyles({
          pathColor: "#30252e",
          trailColor: "#ffd1ff",
          textColor: "#30252e",
        })}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={handleToggle}>
          {isRunning ? (
            <PauseCircleRoundedIcon style={{ fontSize: "5em", color: "#30252E" }} />
          ) : (
            <PlayCircleFilledIcon style={{ fontSize: "5em", color: "#30252E" }} />
          )}
        </button>
        <button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={handleReset}>
          <ChangeCircleRoundedIcon style={{ fontSize: "5em", color: "#30252E" }} />
        </button>
      </div>

      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Break Timer"
          value={breakMinutes}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          size="medium"
          step={1}
          marks
          min={1}
          max={15}
          sx={{ color: "#8E698E" }}
        />
      </Box>
    </section>
  );
};

const Timer = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      minHeight: "60vh"
    }}>
      <WorkTimer /> {/* Componente del temporizador de trabajo */}
      <BreakTimer /> {/* Componente del temporizador de descanso */}
    </div>
  );
};

export default Timer;
