/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.bombepic.model;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
/**
 *
 * @author tiffany
 */
public class Jugadores {
    
        private CopyOnWriteArrayList<Jugador> Jugadores = new CopyOnWriteArrayList();
        private HashMap<String, String> ids = new HashMap<>();
        private CopyOnWriteArrayList<InformacionJuego> informacion = new CopyOnWriteArrayList();

    public CopyOnWriteArrayList<InformacionJuego> getInformacion() {
        return informacion;
            }

    public void setInformacion(InformacionJuego informacion) {
        this.informacion.add(informacion);
            }
        
    public void setIds(String a, String b) {
        this.ids.put(a, b);
        Iterator it = ids.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry e = (Map.Entry) it.next();
                System.out.println("este es ek oruibas"+e.getKey() + " " + e.getValue());

                    }
         }
    public HashMap<String, String> getIds() {
        return ids;
    }

    public CopyOnWriteArrayList<Jugador> getJugadores() {
        return Jugadores;
    }

    public void setJugadores(CopyOnWriteArrayList<Jugador> Jugadores) {
        this.Jugadores = Jugadores;
    }

 
        

    
}
