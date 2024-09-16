import './cards.css'

const Cards = () => {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Instant Server Start</div>
              <p className="card-text">
                On demand file serving over native ESM, no bundling required!
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Lightning Fast HMR</div>
              <p className="card-text">
                Hot Module Replacement (HMR) that stays fast regardless of app
                size.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Rich Features</div>
              <p className="card-text">
                Out-of-the-box support for TypeScript, JSX, CSS and more.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Optimized Build</div>
              <p className="card-text">
                Pre-configured Rollup build with multi-page and library mode
                support.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Universal Plugins</div>
              <p className="card-text">
                Rollup-superset plugin interface shared between dev and build.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Fully Typed APIs</div>
              <p className="card-text">
                Flexible programmatic APIs with full TypeScript typing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
