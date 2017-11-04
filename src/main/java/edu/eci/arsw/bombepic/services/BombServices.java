/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.bombepic.services;

import edu.eci.arsw.bombepic.model.InformacionJuego;
import edu.eci.arsw.bombepic.model.Jugador;
import edu.eci.arsw.bombepic.model.Sala;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author tiffany
 */
public interface BombServices {
    public void registroJugador(int salanum,Jugador p)throws ServicesException;
    
    public List<Jugador> getJugadores( int salanum)throws ServicesException;
    
    public String [][]getTablero()throws ServicesException;
    
    public int getSalaDisponible()throws ServicesException;
    
    public void setSalaDisponible(int sala)throws ServicesException;
    
    public String getId(int sala, String user)  throws ServicesException;
    
    public List<InformacionJuego> getInfo(int sala)throws ServicesException;
    
    public ConcurrentHashMap<Integer,Sala> getSalasMat()throws ServicesException;
    
    public void setSalasMat(ConcurrentHashMap<Integer,Sala> sala)throws ServicesException;

    
    
    
    
}
