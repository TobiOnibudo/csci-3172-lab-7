import { useState, useEffect } from 'react';

const skillsList = [
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'MongoDB', category: 'Database' },
];

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSkills, setFilteredSkills] = useState(skillsList);

  const categories = [...new Set(skillsList.map(skill => skill.category))];

  useEffect(() => {
    const filtered = skillsList.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredSkills(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="btn-group">
          <button
            className={`btn ${!selectedCategory ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedCategory('')}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="row">
        {filteredSkills.map((skill, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{skill.name}</h5>
                <p className="card-text">{skill.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 