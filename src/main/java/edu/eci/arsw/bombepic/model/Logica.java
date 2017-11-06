/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.bombepic.model;

import edu.eci.arsw.bombepic.services.BombServices;
import edu.eci.arsw.bombepic.services.ServicesException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author tiffany
 */



/**
 * 
 *  Flecha izquierda 	37 	
    Flecha arriba 	38 	
    Flecha derecha 	39 	
    Flecha abajo 	40 	
    * 
    * 
    * //3 es un obstaculo
    //0 un espacio en blanco
    //2 pared comible
    //letras en mayusculas son jugadores


 */

@Service
public class Logica implements LogicaInter{
    
     @Autowired
    BombServices services;
    private ConcurrentHashMap<Integer, Sala> salasMatrices ;
    Elemento bomba; 

    public Logica() {
    }


    @Override
    public ActualizaJuego mover(int idsala, PosJugador j) {
         try {
             salasMatrices= services.getSalasMat();
         } catch (ServicesException ex) {
             Logger.getLogger(Logica.class.getName()).log(Level.SEVERE, null, ex);
         }
        
        ActualizaJuego ac = new ActualizaJuego();
        if (!salasMatrices.containsKey(idsala)) {
             try {
                 Sala sala = new Sala(Tablero.tablero());
                 salasMatrices.put(idsala, sala);
             } catch (IOException ex) {
                 Logger.getLogger(Logica.class.getName()).log(Level.SEVERE, null, ex);
             }
        }
        
        ArrayList<Elemento> actualizaciones = new ArrayList();
        String[][] matriz = salasMatrices.get(idsala).getMatriz();
        
        //para el jugador 
        if (matriz[j.getX()][j.getY()].equals("B") || matriz[j.getX()][j.getY()].equals("A") || matriz[j.getX()][j.getY()].equals("C") || matriz[j.getX()][j.getY()].equals("D")) {
             if (j.getKey() == 40) {
                    /*if (!(matriz[j.getX() + 1][j.getY()]).equals("3") && !(matriz[j.getX() + 1][j.getY()]).equals("A") && !(matriz[j.getX() + 1][j.getY()]).equals("B") && !(matriz[j.getX() + 1][j.getY()]).equals("C") && !(matriz[j.getX() + 1][j.getY()]).equals("D")) {
                        if ((matriz[j.getX() + 1][j.getY()]).equals("2") ) { // si se encuentra una pared rompible 
                            String data = matriz[j.getX() + 1][j.getY()];
                            int[] answ = muerte(data, matriz);
                            matriz[answ[0]][answ[1]] = data;
                            System.out.println("explota bomba");
                            
                         
                            
                            
                            Elemento e = new Elemento(j.getX() + 1, j.getY(), matriz[j.getX() + 1][j.getY()], j.getMemo());
                            Elemento e2 = new Elemento(j.getX(), j.getY(), "0", 0);
                            Elemento ej= new Elemento(answ[0],answ[1],"0",0);
                            actualizaciones.add(e);
                            actualizaciones.add(e2);
                            actualizaciones.add(ej);
                            ac.setPosiciones(answ);
                            ac.setJugador(data);
                            ac.setActualizaciones(actualizaciones);
                            
                        }
                         else{ // matar bomberman
                          
                            String data = matriz[j.getX()][j.getY()];
                            matriz[j.getX()][j.getY()] = "0";
                            int[] answ = muerte(data, matriz);
                            ac.setPosiciones(answ);
                            Elemento e = new Elemento(j.getX(), j.getY(), "0", 0);
                            actualizaciones.add(e);
                            ac.setJugador(data);
                            ac.setActualizaciones(actualizaciones);

                        
                        }
                   */         
                    }
                    else{
                        matriz[j.getX() + 1][j.getY()] = matriz[j.getX()][j.getY()];
                        matriz[j.getX()][j.getY()] = "0";
                        Elemento e = new Elemento(j.getX() + 1, j.getY(), matriz[j.getX() + 1][j.getY()], j.getMemo());
                        Elemento e2 = new Elemento(j.getX(), j.getY(), "0", 0);
                        actualizaciones.add(e);
                        actualizaciones.add(e2);
                        ac.setActualizaciones(actualizaciones);
                    
                    }

             }else if(j.getKey() == 37){
                 if (!(matriz[j.getX()][j.getY() - 1]).equals("3") && !(matriz[j.getX()][j.getY() - 1]).equals("A") && !(matriz[j.getX()][j.getY() - 1]).equals("B") && !(matriz[j.getX()][j.getY() - 1]).equals("C") && !(matriz[j.getX()][j.getY() - 1]).equals("D")) {
                    /* if ((matriz[j.getX() + 1][j.getY()]).equals("2") ) { // si se encuentra una pared rompible 
                            String data = matriz[j.getX() + 1][j.getY()];
                            int[] answ = muerte(data, matriz);
                            matriz[answ[0]][answ[1]] = data;
                            System.out.println("explota bomba");
                            
                         
                            
                            
                            Elemento e = new Elemento(j.getX() + 1, j.getY(), matriz[j.getX() + 1][j.getY()], j.getMemo());
                            Elemento e2 = new Elemento(j.getX(), j.getY(), "0", 0);
                            Elemento ej= new Elemento(answ[0],answ[1],"0",0);
                            actualizaciones.add(e);
                            actualizaciones.add(e2);
                            actualizaciones.add(ej);
                            ac.setPosiciones(answ);
                            ac.setJugador(data);
                            ac.setActualizaciones(actualizaciones);
                            
                        }
                         else{ // matar bomberman
                          
                            String data = matriz[j.getX()][j.getY()];
                            matriz[j.getX()][j.getY()] = "0";
                            int[] answ = muerte(data, matriz);
                            ac.setPosiciones(answ);
                            Elemento e = new Elemento(j.getX(), j.getY(), "0", 0);
                            actualizaciones.add(e);
                            ac.setJugador(data);
                            ac.setActualizaciones(actualizaciones);

                        
                        }
   */
                    } 
                    else{
                        matriz[j.getX() + 1][j.getY()] = matriz[j.getX()][j.getY()];
                        matriz[j.getX()][j.getY()] = "0";
                        Elemento e = new Elemento(j.getX() + 1, j.getY(), matriz[j.getX() + 1][j.getY()], j.getMemo());
                        Elemento e2 = new Elemento(j.getX(), j.getY(), "0", 0);
                        actualizaciones.add(e);
                        actualizaciones.add(e2);
                        ac.setActualizaciones(actualizaciones);
                    
                    }
                 
                 
                 
                 
                 }else if (j.getKey() == 38){
                     if (!(matriz[j.getX() - 1][j.getY()]).equals("3") && !(matriz[j.getX() - 1][j.getY()]).equals("A") && !(matriz[j.getX() - 1][j.getY()]).equals("B") && !(matriz[j.getX() - 1][j.getY()]).equals("C") && !(matriz[j.getX() - 1][j.getY()]).equals("D")) {
                        /* if ((matriz[j.getX() + 1][j.getY()]).equals("2") ) { // si se encuentra una pared rompible 
                            String data = matriz[j.getX() + 1][j.getY()];
                            int[] answ = muerte(data, matriz);
                            matriz[answ[0]][answ[1]] = data;
                            System.out.println("explota bomba");
                            
                         
                            
                            
                            Elemento e = new Elemento(j.getX() + 1, j.getY(), matriz[j.getX() + 1][j.getY()], j.getMemo());
                            Elemento e2 = new Elemento(j.getX(), j.getY(), "0", 0);
                            Elemento ej= new Elemento(answ[0],answ[1],"0",0);
                            actualizaciones.add(e);
                            actualizaciones.add(e2);
                            actualizaciones.add(ej);
                            ac.setPosiciones(answ);
                            ac.setJugador(data);
                            ac.setActualizaciones(actualizaciones);
                            
                        }
                         else{ // matar bomberman
                          
                            String data = matriz[j.getX()][j.getY()];
                            matriz[j.getX()][j.getY()] = "0";
                            int[] answ = muerte(data, matriz);
                            ac.setPosiciones(answ);
                            Elemento e = new Elemento(j.getX(), j.getY(), "0", 0);
                            actualizaciones.add(e);
                            ac.setJugador(data);
                            ac.setActualizaciones(actualizaciones);

                        
                        }
   */
                    }
                    else{
                        matriz[j.getX() + 1][j.getY()] = matriz[j.getX()][j.getY()];
                        matriz[j.getX()][j.getY()] = "0";
                        Elemento e = new Elemento(j.getX() + 1, j.getY(), matriz[j.getX() + 1][j.getY()], j.getMemo());
                        Elemento e2 = new Elemento(j.getX(), j.getY(), "0", 0);
                        actualizaciones.add(e);
                        actualizaciones.add(e2);
                        ac.setActualizaciones(actualizaciones);
                    
                    }
                         
                     
              }else if (j.getKey() == 39) {
                    if (!(matriz[j.getX()][j.getY() + 1]).equals("3") && !(matriz[j.getX()][j.getY() + 1]).equals("A") && !(matriz[j.getX()][j.getY() + 1]).equals("B") && !(matriz[j.getX()][j.getY() + 1]).equals("C") && !(matriz[j.getX()][j.getY() + 1]).equals("D")) {
                                  /*if ((matriz[j.getX() + 1][j.getY()]).equals("2") ) { // si se encuentra una pared rompible 
                            String data = matriz[j.getX() + 1][j.getY()];
                            int[] answ = muerte(data, matriz);
                            matriz[answ[0]][answ[1]] = data;
                            System.out.println("explota bomba");
                            
                         
                            
                            
                            Elemento e = new Elemento(j.getX() + 1, j.getY(), matriz[j.getX() + 1][j.getY()], j.getMemo());
                            Elemento e2 = new Elemento(j.getX(), j.getY(), "0", 0);
                            Elemento ej= new Elemento(answ[0],answ[1],"0",0);
                            actualizaciones.add(e);
                            actualizaciones.add(e2);
                            actualizaciones.add(ej);
                            ac.setPosiciones(answ);
                            ac.setJugador(data);
                            ac.setActualizaciones(actualizaciones);
                            
                        }
                         else{ // matar bomberman
                          
                            String data = matriz[j.getX()][j.getY()];
                            matriz[j.getX()][j.getY()] = "0";
                            int[] answ = muerte(data, matriz);
                            ac.setPosiciones(answ);
                            Elemento e = new Elemento(j.getX(), j.getY(), "0", 0);
                            actualizaciones.add(e);
                            ac.setJugador(data);
                            ac.setActualizaciones(actualizaciones);

                        
                        }
   */
                    }
                    else{ //solo avanzar 
                        matriz[j.getX() + 1][j.getY()] = matriz[j.getX()][j.getY()];
                        matriz[j.getX()][j.getY()] = "0";
                        Elemento e = new Elemento(j.getX() + 1, j.getY(), matriz[j.getX() + 1][j.getY()], j.getMemo());
                        Elemento e2 = new Elemento(j.getX(), j.getY(), "0", 0);
                        actualizaciones.add(e);
                        actualizaciones.add(e2);
                        ac.setActualizaciones(actualizaciones);
           
                }

              
              
              
              //}
             
                     
                 
                 }
                salasMatrices.get(idsala).setMatriz(matriz);
         try {
             services.setSalasMat(salasMatrices);
         } catch (ServicesException ex) {
             Logger.getLogger(Logica.class.getName()).log(Level.SEVERE, null, ex);
         }
             
             return ac;
             
             }
             
             
             
             
        
     

    @Override
    public int[] muerte(String data, String[][] matriz) {
        boolean flag = true;
        int myposx = 1, myposy = 1;
        int[] ans = new int[2];
        if (data.equals("A")) {
            myposx = 23;
            myposy = 1;
        } else if (data.equals("B")) {
            myposx = 1;
            myposy = 1;
        } else if (data.equals("D")) {
            myposx = 1;
            myposy = 34;
        } else if (data.equals("C")) {
            myposx = 23;
            myposy = 34;
        }
        
        if (flag) {
            if (!matriz[myposx][myposy].equals("0")) {
                for (int i = 0; i < 24; i++) {
                    for (int col = 0; col < 35; col++) {
                        if (matriz[i][col].equals("0")) {
                            myposx = i;
                            myposy = col;
                            i = 25;
                            break;
                        }
                    }
                }
            }
        } else if (!matriz[myposx][myposy].equals("0")) {
            for (int i = 14; i < 18; i++) {
                for (int col = 16; col < 20; col++) {
                    if (matriz[i][col].equals("0")) {
                        myposx = i;
                        myposy = col;
                        i = 21;
                        break;
                    }
                }
            }
        }
        ans[0] = myposx;
        ans[1] = myposy;
        return ans;
        
    }
    
    
    
    
}
