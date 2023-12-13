import NavBar from './NavBar.js';
import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { groupBy } from 'lodash';

function Statistics() {
  // const [query, setQuery] = useState('');
  // const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [histdata, setHistdata] = useState([]);
  const [message, setMessage] = useState('');
  const [checkedBoxes, setCheckedBoxes] = useState({
    row1: {
      box1: false,
      box2: false,
      box3: false,
      box4: false,
      box5: false,
      box6: false,
      box7: false,
      box8: false,
      box9: false,
      box10: false,
    },
    row2: {
      box1: false,
      box2: false,
      box3: false,
      box4: false,
      box5: false,
      box6: false,
      box7: false,
      box8: false,
      box9: false,
      box10: false,
      box11: false,
      box12: false,
      box13: false,
      box14: false,
      box15: false,
      box16: false,
      box17: false,
      box18: false,
      box19: false,
      box20: false,
      box21: false,
      box22: false,
    },
  });

  const handleSearch_Statistics = async (event) => {
    try {
      // console.log(checkedBoxes)
      const { name, value } = event.target;
      setCheckedBoxes((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          [value]: !prevState[name][value],
        },
      }));

      const checkedBoxLabels = Object.entries(checkedBoxes)
        .flatMap(([row, boxes]) => {
          if (boxes) {
            return Object.entries(boxes)
              .filter(([box, checked]) => checked)
              .map(([box]) => `${row}_${box}`);
          } else {
            return [];
          }
        })
        .join(',');

      console.log(checkedBoxLabels);
      const response = await axios.get(`http://127.0.0.1:8000/crimes/statistics/?boxes=${checkedBoxLabels}`);
      console.log(response.data);
      if ('error' in response.data) {
        setMessage(response.data.error);
        setResults([]);
      } else {
        setMessage('');
        setResults(response.data.results);
        const groupedResults = groupBy(response.data.results, 'crime_type');
        const histograms = Object.entries(groupedResults).map(([crimeType, data]) => {
          // count the number of crimes in each city
          const counts = data.reduce((acc, { area_name }) => {
            acc[area_name] = (acc[area_name] || 0) + 1;
            return acc;
          }, {});

          // convert counts to an array of objects with 'area_name' and 'count' properties
          const countsArray = Object.entries(counts).map(([area_name, count]) => ({ area_name, count }));

          const crimeDescMapping = {
            110: 'CRIMINAL HOMICIDE',
            231: 'ASSAULT WITH DEADLY WEAPON ON POLICE OFFICER',
            237: 'CHILD NEGLECT',
            251: 'SHOTS FIRED AT INHABITED DWELLING',
            421: 'THEFT FROM MOTOR VEHICLE - ATTEMPT',
            812: 'CRM AGNST CHLD',
            815: 'SEXUAL PENETRATION W/FOREIGN OBJECT',
            845: 'SEX OFFENDER REGISTRANT OUT OF COMPLIANCE',
            886: 'DISTURBING THE PEACE',
            940: 'EXTORTION',
          }

          const crimeDesc = crimeDescMapping[crimeType];

          return (
            <div key={crimeType}>
              <h4>{crimeDesc}</h4>
              <BarChart width={500} height={300} data={countsArray}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area_name" label={{ value: 'Area Name', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'Number of Crimes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </div>
          );
        });
        setHistdata(histograms);
        console.log('groups: ', groupedResults);
      }
    } catch (error) {
      console.error(error);
      setResults([]);
    }
  }

  const clearAll = () => {
    setCheckedBoxes({
      row1: {
        box1: false,
        box2: false,
        box3: false,
        box4: false,
        box5: false,
        box6: false,
        box7: false,
        box8: false,
        box9: false,
        box10: false,
      },
      row2: {
        box1: false,
        box2: false,
        box3: false,
        box4: false,
        box5: false,
        box6: false,
        box7: false,
        box8: false,
        box9: false,
        box10: false,
        box11: false,
        box12: false,
        box13: false,
        box14: false,
        box15: false,
        box16: false,
        box17: false,
        box18: false,
        box19: false,
        box20: false,
        box21: false,
        box22: false,
      },
    });
    window.location.reload();
  }


  return (
    <div>
      <NavBar />

      <h2>Statistics</h2>

      <h3>Crime Types</h3>
      <div>
        <input
          type="checkbox"
          name="row1"
          value="box1"
          checked={checkedBoxes.row1.box1}
          onChange={handleSearch_Statistics}
        />
        <label>CRIMINAL HOMICIDE    </label>
        <input
          type="checkbox"
          name="row1"
          value="box2"
          checked={checkedBoxes.row1.box2}
          onChange={handleSearch_Statistics}
        />
        <label>ASSAULT WITH DEADLY WEAPON ON POLICE OFFICER    </label>
        <input
          type="checkbox"
          name="row1"
          value="box3"
          checked={checkedBoxes.row1.box3}
          onChange={handleSearch_Statistics}
        />
        <label>CHILD NEGLECT (SEE 300 W.I.C.)    </label>
        <input
          type="checkbox"
          name="row1"
          value="box4"
          checked={checkedBoxes.row1.box4}
          onChange={handleSearch_Statistics}
        />
        <label>SHOTS FIRED AT INHABITED DWELLING    </label>
        <input
          type="checkbox"
          name="row1"
          value="box5"
          checked={checkedBoxes.row1.box5}
          onChange={handleSearch_Statistics}
        />
        <label>THEFT FROM MOTOR VEHICLE - ATTEMPT    </label>
        <input
          type="checkbox"
          name="row1"
          value="box6"
          checked={checkedBoxes.row1.box6}
          onChange={handleSearch_Statistics}
        />
        <label>CRM AGNST CHLD (13 OR UNDER) (14-15 & SUSP 10 YRS OLDER)    </label>
        <input
          type="checkbox"
          name="row1"
          value="box7"
          checked={checkedBoxes.row1.box7}
          onChange={handleSearch_Statistics}
        />
        <label>SEXUAL PENETRATION W/FOREIGN OBJECT    </label>
        <input
          type="checkbox"
          name="row1"
          value="box8"
          checked={checkedBoxes.row1.box8}
          onChange={handleSearch_Statistics}
        />
        <label>SEX OFFENDER REGISTRANT OUT OF COMPLIANCE    </label>
        <input
          type="checkbox"
          name="row1"
          value="box9"
          checked={checkedBoxes.row1.box9}
          onChange={handleSearch_Statistics}
        />
        <label>DISTURBING THE PEACE    </label>
        <input
          type="checkbox"
          name="row1"
          value="box10"
          checked={checkedBoxes.row1.box10}
          onChange={handleSearch_Statistics}
        />
        <label>EXTORTION    </label>
      </div>

      <h3>Districts</h3>
      <div>
        <input
          type="checkbox"
          name="row2"
          value="box1"
          checked={checkedBoxes.row2.box1}
          onChange={handleSearch_Statistics}
        />
        <label>77th Street    </label>
        <input
          type="checkbox"
          name="row2"
          value="box2"
          checked={checkedBoxes.row2.box2}
          onChange={handleSearch_Statistics}
        />
        <label>Central    </label>
        <input
          type="checkbox"
          name="row2"
          value="box3"
          checked={checkedBoxes.row2.box3}
          onChange={handleSearch_Statistics}
        />
        <label>Devonshire    </label>
        <input
          type="checkbox"
          name="row2"
          value="box4"
          checked={checkedBoxes.row2.box4}
          onChange={handleSearch_Statistics}
        />
        <label>Foothill    </label>
        <input
          type="checkbox"
          name="row2"
          value="box5"
          checked={checkedBoxes.row2.box5}
          onChange={handleSearch_Statistics}
        />
        <label>Harbor    </label>
        <input
          type="checkbox"
          name="row2"
          value="box6"
          checked={checkedBoxes.row2.box6}
          onChange={handleSearch_Statistics}
        />
        <label>Hollenbeck    </label>
        <input
          type="checkbox"
          name="row2"
          value="box7"
          checked={checkedBoxes.row2.box7}
          onChange={handleSearch_Statistics}
        />
        <label>Hollywood    </label>
        <input
          type="checkbox"
          name="row2"
          value="box8"
          checked={checkedBoxes.row2.box8}
          onChange={handleSearch_Statistics}
        />
        <label>Mission    </label>
        <input
          type="checkbox"
          name="row2"
          value="box9"
          checked={checkedBoxes.row2.box9}
          onChange={handleSearch_Statistics}
        />
        <label>N Hollywood    </label>
        <input
          type="checkbox"
          name="row2"
          value="box10"
          checked={checkedBoxes.row2.box10}
          onChange={handleSearch_Statistics}
        />
        <label>Newton    </label>
        <input
          type="checkbox"
          name="row2"
          value="box11"
          checked={checkedBoxes.row2.box11}
          onChange={handleSearch_Statistics}
        />
        <label>Northeast    </label>
        <input
          type="checkbox"
          name="row2"
          value="box12"
          checked={checkedBoxes.row2.box12}
          onChange={handleSearch_Statistics}
        />
        <label>Olympic    </label>
        <input
          type="checkbox"
          name="row2"
          value="box13"
          checked={checkedBoxes.row2.box13}
          onChange={handleSearch_Statistics}
        />
        <label>Pacific    </label>
        <input
          type="checkbox"
          name="row2"
          value="box14"
          checked={checkedBoxes.row2.box14}
          onChange={handleSearch_Statistics}
        />
        <label>Rampart    </label>
        <input
          type="checkbox"
          name="row2"
          value="box15"
          checked={checkedBoxes.row2.box15}
          onChange={handleSearch_Statistics}
        />
        <label>Southeast    </label>
        <input
          type="checkbox"
          name="row2"
          value="box16"
          checked={checkedBoxes.row2.box16}
          onChange={handleSearch_Statistics}
        />
        <label>Southwest    </label>
        <input
          type="checkbox"
          name="row2"
          value="box17"
          checked={checkedBoxes.row2.box17}
          onChange={handleSearch_Statistics}
        />
        <label>Topanga    </label>
        <input
          type="checkbox"
          name="row2"
          value="box18"
          checked={checkedBoxes.row2.box18}
          onChange={handleSearch_Statistics}
        />
        <label>Van Nuys    </label>
        <input
          type="checkbox"
          name="row2"
          value="box19"
          checked={checkedBoxes.row2.box19}
          onChange={handleSearch_Statistics}
        />
        <label>West LA    </label>
        <input
          type="checkbox"
          name="row2"
          value="box20"
          checked={checkedBoxes.row2.box20}
          onChange={handleSearch_Statistics}
        />
        <label>West Valley    </label>
        <input
          type="checkbox"
          name="row2"
          value="box21"
          checked={checkedBoxes.row2.box21}
          onChange={handleSearch_Statistics}
        />
        <label>Wilshire    </label>
      </div>


      <div>
        <button
          name="row2"
          value="box22"
          onClick={handleSearch_Statistics}
        >
          {checkedBoxes.row2.box22 ? 'UNREFRESH' : 'REFRESH'}
        </button>
      </div>

      <div>
        <button onClick={clearAll}>Clear All</button>
      </div>

      {/* <div>
          <p>Checked boxes:</p>
          <ul>
            <li>Checkbox 1  - Row 1: {checkedBoxes.row1.box1.toString()}</li>
            <li>Checkbox 2  - Row 1: {checkedBoxes.row1.box2.toString()}</li>
            <li>Checkbox 3  - Row 1: {checkedBoxes.row1.box3.toString()}</li>
            <li>Checkbox 4  - Row 1: {checkedBoxes.row1.box4.toString()}</li>
            <li>Checkbox 5  - Row 1: {checkedBoxes.row1.box5.toString()}</li>
            <li>Checkbox 6  - Row 1: {checkedBoxes.row1.box6.toString()}</li>
            <li>Checkbox 7  - Row 1: {checkedBoxes.row1.box7.toString()}</li>
            <li>Checkbox 8  - Row 1: {checkedBoxes.row1.box8.toString()}</li>
            <li>Checkbox 9  - Row 1: {checkedBoxes.row1.box9.toString()}</li>
            <li>Checkbox 10 - Row 1: {checkedBoxes.row1.box10.toString()}</li>
            <li>Checkbox 1  - Row 2: {checkedBoxes.row2.box1.toString()}</li>
            <li>Checkbox 2  - Row 2: {checkedBoxes.row2.box2.toString()}</li>
            <li>Checkbox 3  - Row 2: {checkedBoxes.row2.box3.toString()}</li>
            <li>Checkbox 4  - Row 2: {checkedBoxes.row2.box4.toString()}</li>
            <li>Checkbox 5  - Row 2: {checkedBoxes.row2.box5.toString()}</li>
            <li>Checkbox 6  - Row 2: {checkedBoxes.row2.box6.toString()}</li>
            <li>Checkbox 7  - Row 2: {checkedBoxes.row2.box7.toString()}</li>
            <li>Checkbox 8  - Row 2: {checkedBoxes.row2.box8.toString()}</li>
            <li>Checkbox 9  - Row 2: {checkedBoxes.row2.box9.toString()}</li>
            <li>Checkbox 10 - Row 2: {checkedBoxes.row2.box10.toString()}</li>
            <li>Checkbox 11 - Row 2: {checkedBoxes.row2.box11.toString()}</li>
            <li>Checkbox 12 - Row 2: {checkedBoxes.row2.box12.toString()}</li>
            <li>Checkbox 13 - Row 2: {checkedBoxes.row2.box13.toString()}</li>
            <li>Checkbox 14 - Row 2: {checkedBoxes.row2.box14.toString()}</li>
            <li>Checkbox 15 - Row 2: {checkedBoxes.row2.box15.toString()}</li>
            <li>Checkbox 16 - Row 2: {checkedBoxes.row2.box16.toString()}</li>
            <li>Checkbox 17 - Row 2: {checkedBoxes.row2.box17.toString()}</li>
            <li>Checkbox 18 - Row 2: {checkedBoxes.row2.box18.toString()}</li>
            <li>Checkbox 19 - Row 2: {checkedBoxes.row2.box19.toString()}</li>
            <li>Checkbox 20 - Row 2: {checkedBoxes.row2.box20.toString()}</li>
            <li>Checkbox 21 - Row 2: {checkedBoxes.row2.box21.toString()}</li>
          </ul>
        </div> */}

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {histdata}
      </div>

      {message && <div>{message}</div>}
      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>EventID</th>
              <th>Date Reported</th>
              <th>Date Occurred</th>
              <th>Area Name</th>
              <th>Street Name</th>
              <th>Crime Type</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.eventid}</td>
                <td>{result.datereported}</td>
                <td>{result.dateoccurred}</td>
                <td>{result.area_name}</td>
                <td>{result.location}</td>
                <td>{result.crime_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default Statistics;
