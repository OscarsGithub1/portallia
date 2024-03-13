import React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Paper } from '@mui/material';

const DealsDetailed = () => {
  return (
    <div style={{ fontSize: '14px', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <Paper elevation={10} style={{ borderRadius: '18px', width: '85%', marginBottom: '60px', padding: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <AssignmentOutlinedIcon fontSize="large" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          <h3 style={{ margin: 0 }}>Avtalsdetaljer</h3>
        </div>
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="slutkund">Slutkund</label>
          <input type="text" className="form-control" id="slutkund" />
        </div>
        <div className="col">
          <label htmlFor="uppdrag">Namn på uppdrag</label>
          <input type="text" className="form-control" id="uppdrag"/>
        </div>
        <div className="col">
          <label htmlFor="placeringsort">Placeringsort</label>
          <input type="text" className="form-control" id="placeringsort" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col" style={{ flex: 0.48 }}>
          <label htmlFor="startdatum">Startdatum</label>
          <input type="date" className="form-control" id="startdatum" />
        </div>
        <div className="col" style={{ flex: 0.47}}>
          <label htmlFor="slutdatum">Slutdatum</label>
          <input type="date" className="form-control" id="slutdatum" />
        </div>
        <div className="col">
          <label htmlFor="roll">Roll</label>
          <input type="value" className="form-control" id="roll" />
        </div>
        <div className="col">
          <label htmlFor="omfattning">Uppdrag omfattning(%)</label>
          <input type="text" className="form-control" id="omfattning" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="beskrivning">Beskrivning uppdrag</label>
          <textarea className="form-control" id="beskrivning" rows="3"></textarea>
        </div>
        <div className="col">
          <label htmlFor="kompetens">Kompetenskrav</label>
          <textarea className="form-control" id="kompetens" rows="3"></textarea>
        </div>
        <div className="col">
          <label htmlFor="onskemal">Övriga önskemål</label>
          <textarea className="form-control" id="onskemal" rows="3"></textarea>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="pris-kund">Pris-h kund</label>
          <input type="text" className="form-control" id="pris-kund" />
        </div>
        <div className="col">
          <label htmlFor="antal-timmar">Antal timmar</label>
          <input type="text" className="form-control" id="antal-timmar" />
        </div>
        <div className="col">
          <label htmlFor="vald-leverantor">Vald leverantör</label>
          <input type="text" className="form-control" id="vald-leverantor" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="vald-konsult">Vald konsult</label>
          <input type="text" className="form-control" id="vald-konsult" />
        </div>
        <div className="col">
          <label htmlFor="konsultchef">Kontaktperson-konsultchef</label>
          <input type="text" className="form-control" id="konsultchef" />
        </div>
        <div className="col">
          <label htmlFor="avtalsansvarig">Avtalsansvarig leverantör</label>
          <input type="text" className="form-control" id="avtalsansvarig" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="organisationsnummer">Organisationsnummer</label>
          <input type="text" className="form-control" id="organisationsnummer" />
        </div>
        <div className="col">
          <label htmlFor="momsnummer">Momsnummer</label>
          <input type="text" className="form-control" id="momsnummer" />
        </div>
        <div className="col">
          <label htmlFor="adress">Adress leverantör</label>
          <input type="text" className="form-control" id="adress" />
        </div>
      </div>
      <div className="row mb-4">  
        <div className="col">
          <label htmlFor="postnummer">Postnummer leverantör</label>
          <input type="text" className="form-control" id="postnummer" />
        </div>
        <div className="col">
          <label htmlFor="postort">Postort leverantör</label>
          <input type="text" className="form-control" id="postort" />
        </div>
        <div className="col">
          <label htmlFor="land">Land leverantör</label>
          <input type="text" className="form-control" id="land" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="foretagsvy">Länk vald leverantörs företagsvy</label>
          <input type="text" className="form-control" id="foretagsvy" />
        </div>
        <div className="col">
          <label htmlFor="upplarningstid">Upplärningstid</label>
          <input type="text" className="form-control" id="upplarningstid" />
        </div>
        <div className="col">
          <label htmlFor="forlangningsvillkor">Förlängningsvillkor leverantör</label>
          <input type="text" className="form-control" id="forlangningsvillkor" />
        </div>
      </div> 
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="betalningsvillkor">Betalningsvillkor leverantör</label>
          <input type="text" className="form-control" id="betalningsvillkor" />
        </div>
        <div className="col">
          <label htmlFor="uppsagningsvillkor">Uppsägningsvillkor leverantör</label>
          <input type="text" className="form-control" id="uppsagningsvillkor" />
        </div>
        <div className="col">
          <label htmlFor="po-nummer">PO nummer</label>
          <input type="text" className="form-control" id="po-nummer" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col" style={{ flex: 0.155}}>
          <label htmlFor="forlangningsdatum">Förlängningsdatum</label>
          <input type="date" className="form-control" id="forlangningsdatum" />
        </div>
        <div className="col" style={{ flex: 0.157}}>
          <label htmlFor="uppsagningsdatum">Uppsägningsdatum</label>
          <input type="date" className="form-control" id="uppsagningsdatum" />
        </div>
      </div>
    </Paper>
    </div>

  );
};

export default DealsDetailed;
