/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.bombepic.controllers;


import edu.eci.arsw.bombepic.model.ActualizaJuego;
import edu.eci.arsw.bombepic.model.Logica;
import edu.eci.arsw.bombepic.model.PosJugador;
import edu.eci.arsw.bombepic.services.BombServices;
import java.awt.Point;
import java.util.concurrent.ConcurrentLinkedQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 *
 * @author tiffany
 */

@Controller
public class STOMPMessagesHandler {
    @Autowired
    SimpMessagingTemplate msgt;
    
     @Autowired
    BombServices services;
     @Autowired
    Logica Logic;
    Object Lock = new Object();
     
     
    
    @MessageMapping("/mover.{idsala}")
    public void mover(@DestinationVariable int idsala, PosJugador j) {
        synchronized (Lock) {
            ActualizaJuego ac = Logic.mover(idsala, j);
            if (ac.getActualizaciones()!=null){
             
                msgt.convertAndSend("/topic/actualizarJuego." + String.valueOf(idsala), ac.getActualizaciones());
                System.out.println(" RECIBE " +  ac.getActualizaciones());
                
                if (ac.getRompibles()){
                    ac.setRompibles(false);
                    msgt.convertAndSend("/topic/ ."+String.valueOf(idsala), ac.getRompibles()); 
                }
                else{
                    msgt.convertAndSend("/topic/"+String.valueOf(idsala)+'/'+ac.getJugador(), ac.getPosiciones());  
                }
            
           
            }
            
        
        
        
        
        }
                                
    
    
    }
      
    

}
    
    

