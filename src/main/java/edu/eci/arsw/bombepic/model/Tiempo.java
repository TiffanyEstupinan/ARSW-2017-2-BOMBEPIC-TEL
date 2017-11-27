/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.bombepic.model;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.messaging.simp.SimpMessagingTemplate;

/**
 *
 * @author tiffany
 */
public class Tiempo extends Thread{
    SimpMessagingTemplate msgt;
    
    int numsala;
    String nombre;
    public Tiempo(int numsala,String nombre,SimpMessagingTemplate msgt) {
            this.numsala=numsala;
            this.nombre=nombre;
            this.msgt=msgt;
	}
   
    public Tiempo(){}
    
    @Override
	public void run() {
        try {
            
            Tiempo.sleep(40000);
            msgt.convertAndSend("/topic/findejuego."+String.valueOf(numsala), "images/winner.png"); 
        } catch (InterruptedException ex) {
            Logger.getLogger(Tiempo.class.getName()).log(Level.SEVERE, null, ex);
        }
        }
           
        
};
    
    
    

