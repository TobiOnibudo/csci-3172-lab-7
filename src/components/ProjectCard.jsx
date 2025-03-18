const ProjectCard = ({ title, description, liveDemo, repo }) => {
    return (
      <div className="col-md-6 mb-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{description}</p>
            {liveDemo && (
              <a
                href={liveDemo}
                className="btn btn-primary me-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            )}
            {repo && (
              <a
                href={repo}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;  