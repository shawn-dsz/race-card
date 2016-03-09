/**
 * Creates a component to dislay racers stats.
 * @return {[ReactNode]}   [RaceResult]
 */
var RaceResult = React.createClass({
  render: function() {
    return (
      <div className="r-result">
        <div className="r-result-item r-result-item__title r-text-grid-label">{this.props.tabNumber}. {this.props.horseFullName}</div>
        {this.props.oddWin && this.props.result === 1 ? <div className="r-result-item">${this.props.oddWin}</div> : null }
        {this.props.oddPlace ? <div className="r-result-item">${this.props.oddPlace}</div> : null }
        {this.props.winningTime && this.props.result === 1 ? <div className="r-result-item">{this.props.winningTime}</div> : null }
        {this.props.margin ? <div className="r-result-item">{this.props.margin}L</div> : null }
      </div>
    );
  }
});

/**
 * Create a component to hold race card results
 * @return {[ReactNode]}   [RaceCardResults]
 */
var RaceCardResults = React.createClass({
  /**
   * converts seconds & milli seconds to timeDisplay
   * @param  {[number]} timeDisplay [seconds and milli seconds as number]
   * @return {[string]}             [formatted seconds and milli seconds]
   */
  _secToMin: function(timeDisplay){
    var timeDisplayString = timeDisplay.toString();
    var time = timeDisplayString.toString().substr(0, timeDisplayString.length - 2)
    var minutes = Math.floor(time / 60);
    time -= minutes * 60;

    var seconds = parseInt(time % 60, 10);
    return minutes + ":" + seconds + ":" + timeDisplayString.substr(2, timeDisplayString.length);
  },

  render: function() {
    var secToMin = this._secToMin;
    var results = this.props.results.map(function(result){
      return (
        <RaceResult
          tabNumber={result.TabNumber}
          horseFullName={result.Horse.FullName}
          winningTime={secToMin(result.WinningTime)}
          oddWin={result.OddWin}
          result={result.Result}
          oddPlace={result.OddPlace}
          margin={result.Margin}
        />
      );
    });

    return (
      <div className={"r-card__detail r-card__section" + (this.props.hideDetails ? ' hide': '')}>
        {results}
      </div>
    );
  }
});

/**
 * Creates the race card action component that holds buttons
 * @return {[ReactNode]}   [the RaceCardActions component]
 */
var RaceCardActions = React.createClass({
  handleClick: function(){
    window.open(this.props.photoFinish)
  },

  render: function() {
    return (
        <div className={"r-card__actions r-card__section" + (this.props.hideDetails ? ' hide': '')}>
          <div className="r-layout-1-of-2 r-button-section-sub">
            <button className="r-btn r-u-fullwidth" onClick={this.handleClick}>Finish
            <svg className="r-btn-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.333 533.333"><g>
            <path d="M158.333,300c0,59.831,48.502,108.333,108.333,108.333S375,359.831,375,300s-48.502-108.333-108.333-108.333S158.333,240.169,158.333,300z M500,116.667H383.333C375,83.333,366.667,50,333.333,50H200c-33.333,0-41.667,33.333-50,66.667   H33.333C15,116.667,0,131.667,0,150v300c0,18.333,15,33.333,33.333,33.333H500c18.333,0,33.334-15,33.334-33.333V150   C533.333,131.667,518.333,116.667,500,116.667z M266.667,447.917c-81.692,0-147.917-66.224-147.917-147.917   c0-81.692,66.224-147.917,147.917-147.917c81.693,0,147.917,66.224,147.917,147.917   C414.583,381.693,348.361,447.917,266.667,447.917z M500,216.667h-66.666v-33.333H500V216.667z"/>
            </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
            </svg></button>
          </div>
          <div className="r-layout-1-of-2 r-button-section-sub">
            <button className="r-btn r-u-fullwidth">Replay
            <svg className="r-btn-icon"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1" viewBox="0 0 314.068 314.068">
            <g><g id="_x33_56._Play"><g>
            <path d="M293.002,78.53C249.646,3.435,153.618-22.296,78.529,21.068C3.434,64.418-22.298,160.442,21.066,235.534c43.35,75.095,139.375,100.83,214.465,57.47C310.627,249.639,336.371,153.62,293.002,78.53z M219.834,265.801     c-60.067,34.692-136.894,14.106-171.576-45.973C13.568,159.761,34.161,82.935,94.23,48.26     c60.071-34.69,136.894-14.106,171.578,45.971C300.493,154.307,279.906,231.117,219.834,265.801z M213.555,150.652l-82.214-47.949     c-7.492-4.374-13.535-0.877-13.493,7.789l0.421,95.174c0.038,8.664,6.155,12.191,13.669,7.851l81.585-47.103     C221.029,162.082,221.045,155.026,213.555,150.652z"/>
            </g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
            </svg></button>
          </div>
        </div>
    );
  }
});

/**
 * Creates a component to highlight information about a race
 * @return {[ReactNode]}   [RaceCardHeader]
 */
var RaceCardHeader = React.createClass({
  render: function() {
    return (
      <div className="r-card__header r-card__section" onClick={this.props.handleClick}>
        <div className="r-card__header-item">
          <abbr className="r-avatar">{this.props.number}</abbr>
        </div>
        <div className="r-card__header-item">
          <div className="r-u-flex-col">
            <span className="r-text-heading">{this.props.name}</span>
            <div className="r-u-flex-col">
              <span className="r-card-label">Results</span>
              <span className="r-text-subheading">{this.props.timeDisplay}, </span>
              <span className="r-text-subheading">{this.props.distance}m, </span>
              <span className="r-text-subheading">{this.props.nameForm}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

/**
 * Creates the Race card component
 * @return {[ReactNode]}   [RaceCard component]
 */
var RaceCard = React.createClass({
  handleClick: function(event){
    this.setState({
      hideDetails: !this.state.hideDetails
    })
  },

  getInitialState: function() {
     return {
       hideDetails: true
     };
   },

  render: function() {
    return (
      <section className="r-card">
        <RaceCardHeader
          name={this.props.name}
          number={this.props.number}
          timeDisplay={this.props.timeDisplay}
          distance={this.props.distance}
          nameForm={this.props.nameForm}
          handleClick={this.handleClick}
        />
        <RaceCardActions hideDetails={this.state.hideDetails} photoFinish={this.props.photoFinish}/>
        <RaceCardResults results={this.props.results} hideDetails={this.state.hideDetails}/>
      </section>
    );
  }
});

/**
 * Creates a component to render RaceCard list
 * @return {[ReactNode]}   [RaceList]
 */
var RaceList = React.createClass({
  render: function() {
    var raceInfoList = this.props.raceInfoList.map(function(raceInfo) {
      var race = raceInfo.Race;
      return (
        <RaceCard
          name={race.Name}
          number={race.Number}
          timeDisplay={race.TimeDisplay}
          distance={race.Distance}
          nameForm={race.NameForm}
          photoFinish={race.PhotoFinish}
          results={raceInfo.Results}
        />
      )
    });

    var hasContent = this.props.raceInfoList.length > 0;
    return (
      <div className="r-card-list">
        {hasContent ? raceInfoList : <div>No items.</div>}
      </div>
    );
  }
});

/**
 * Creates a dashboard component to display race info.
 * @return {[ReactNode]}   [Dashboard]
 */
var Dashboard = React.createClass({
  getInitialState: function() {
     return {
       raceInfoList: [],
       loading: true
     };
   },
  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (raceInfoList) {
      raceInfoList = (typeof(raceInfoList) === 'string') ? JSON.parse(raceInfoList): raceInfoList;
      if (this.isMounted()) {
       this.setState({
         raceInfoList: raceInfoList.Races,
         loading: false
       });
     }
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
      {this.state.loading ?
        <img src="http://vcf.iobio.io/assets/images/loading_dots.gif"/> :
        <RaceList raceInfoList={this.state.raceInfoList}/>}
      </div>
    );
  }
});

$(document).ready(function() {
  React.render(
    <Dashboard
      source="https://s3-ap-southeast-2.amazonaws.com/racevic.test-static/racing-data-sample.json"
    />,
    document.getElementById('container')
  );
});
