import React, { Component } from 'react';
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";
import './ScheduleStyle.css';

var recruiter_name = ''
const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  },
  h1: {
    marginBottom: "5%"
  },
  a: {
    color: "gray"
  }
};

// Cria a timezone 
DayPilot.Locale.register(
  new DayPilot.Locale('my-timezone',
    {
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      timePattern: 'h:mm ',
      datePattern: 'd/M/yyyy',
      dateTimePattern: 'd/M/yyyy h:mm ',
      timeFormat: 'Clock24Hours',
      weekStarts: 0,
    }
  ));

class Schedule extends Component {
  constructor(props) {
    super(props);
    // props
    recruiter_name = this.props.name;
    // Muda as cores de cada recruiter
    if (recruiter_name == 'Ines'){
      var recruiter_color = "#d1247a"
    }
    if (recruiter_name == 'Ingrid'){
      var recruiter_color = "#0cc0c9"
    }
    if (recruiter_name == 'Root'){
      var recruiter_color = '#bf3531'
    }
    recruiter_name != 'Guest' ? (
      // Recruiter view
      this.state = {
      locale: 'my-timezone',
      headerDateFormat: 'ddd: dd/MM/yyyy',
      dayBeginsHour: 9,
      dayEndsHour: 19,
      cellDuration: 60,
      cellHeight: 50,
      viewType: "WorkWeek",
      durationBarVisible: true,
      timeRangeSelectHandling: "Enabled",
      allowEventOverlap: false,
      eventMoveHandling: "Disabled",

      
      // Cria um evento
      onTimeRangeSelected: args => {
        let dp = this.calendar;        
        DayPilot.Modal.confirm("Do you wish to confirm your availability?").then(function (modal) {
          dp.clearSelection();
          if (!modal.result) { return; }
          // Novo evento
          let newEvent = new DayPilot.Event({
            start: args.start,
            end: args.end,
            // id: DayPilot.guid(),
            backColor: recruiter_color,
            text: recruiter_name
          });
          // Adiciona aos eventos
          dp.events.add(newEvent)
          console.log(newEvent.data.start.value);

          // Guarda na DB com o método POST
          const request = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            body: JSON.stringify(newEvent.data
            ),
          }

          fetch("/api/addevent", request).then(function(resp){
            console.log(resp)
          })
        },
        );

      },
      
      // Apaga o evento
      onEventClick: args => {
        let dp = this.calendar;
        if(recruiter_name == 'Root' || recruiter_name == args.e.data.text){
          DayPilot.Modal.confirm("Do you wish to remove your availability?").then(function (modal) {
            dp.clearSelection();
            if (!modal.result){
              return; 
            }else{
              // Faz um POST
              const request = {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(args.e.data),
              }
    
              fetch("/api/removeevent", request).then(function(resp){
                console.log(resp)
              })
              
              dp.events.remove(args.e)
            }
          });
        }
      },
    }
    ):
    this.state = {
      locale: 'my-timezone',
      headerDateFormat: 'dddd',
      dayBeginsHour: 9,
      dayEndsHour: 19,
      cellDuration: 60,
      cellHeight: 50,
      viewType: "WorkWeek",
      durationBarVisible: true,
      eventMoveHandling: "Disabled",

    }
  }

  // Eventos
  componentDidMount() {


    // GET request para ir buscar os dados à DB
    fetch("/api/getevents")
      .then(response => response.json())
      .then(data => this.setState({startDate: "2021-02-01", events: data.data},
      console.log(data.data)
      
      ));
  }

  // Faz o render
  render() {
    var { ...config } = this.state;
    return (
      <div>
        <div style={styles.main}>
        {
          this.props.name != "Guest" ? (
            <h1 style={styles.h1} > Hello, {recruiter_name}! <h2>Please, select your availability bellow:</h2> </h1>
          ):
            <h1 style={styles.h1}>Hello, {recruiter_name}! <h2>Please, let us know about the better date and hour for you, by sending us an email for: <a style={styles.a} href="mailto:recruitment@company.com" >recruitment@company.com</a></h2></h1>
        }
          <DayPilotCalendar
            {...config}
            ref={component => {
              this.calendar = component && component.control;
            }}
          />
        </div>
      </div>
    );
  }
}

// Exporta para o ficheiro index.js
export default Schedule;