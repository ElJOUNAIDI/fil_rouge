import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";
import "../../style/Detail.css"; 

export default function Detail() {
  const { id } = useParams();
  const [terrain, setTerrain] = useState(null);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("10:00");
  const [end, setEnd] = useState("11:00");
  const [mode, setMode] = useState("cash");

  useEffect(() => {
    api
      .get(`/terrains/${id}`)
      .then((r) => setTerrain(r.data))
      .catch(() => alert("Erreur de chargement"));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Connecte-toi d’abord !");
    try {
      await api.post("/reservations", {
        terrain_id: id,
        date_reservation: date,
        heure_debut: start,
        heure_fin: end,
        mode_paiement: mode,
      });
      alert("✅ Réservation créée avec succès !");
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la réservation");
    }
  };

  if (!terrain) return <div>Chargement...</div>;

  return (
    <div className="detail-page">
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <h3>{terrain.nom}</h3>
            <p className="blue-text">
              {terrain.description} <br />
              <strong>Prix / h :</strong> {terrain.prix_par_heure} €
            </p>

            <div className="card">
              <h5 className="text-center mb-4">Réserver ce terrain</h5>

              <form className="form-card" onSubmit={submit}>
                {/* DATE */}
                <div className="form-group flex-column d-flex text-left">
                  <label className="form-control-label px-3">
                    Date de réservation <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                {/* HEURE DÉBUT */}
                <div className="form-group flex-column d-flex text-left">
                  <label className="form-control-label px-3">
                    Heure de début <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                  />
                </div>

                {/* HEURE FIN */}
                <div className="form-group flex-column d-flex text-left">
                  <label className="form-control-label px-3">
                    Heure de fin <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                  />
                </div>

                {/* MODE PAIEMENT */}
                <div className="form-group flex-column d-flex text-left">
                  <label className="form-control-label px-3">
                    Mode de paiement <span className="text-danger">*</span>
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    required
                  >
                    <option value="cash">Espèces</option>
                    {/* <option value="card">Carte</option> */}
                  </select>
                </div>

                <div className="form-group text-center mt-4">
                  <button type="submit" className="btn-block btn-primary">
                    Réserver maintenant
                  </button>
                </div>
              </form>
            </div>

            <p className="mt-4">
              <strong>Adresse :</strong> {terrain.adresse}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
