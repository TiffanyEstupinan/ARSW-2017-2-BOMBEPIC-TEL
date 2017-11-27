/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.bombepic.model;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author tiffany
 */
public  class Tablero {
    public  static String[][] tabl;
    public static int puntos; 
    
    
    public static String [][] tablero() throws IOException{
        
        int fil=28;
        int col=36;
        puntos =200;
        tabl=new String[fil][col];
        
        
        
          //recubre el tablero de pared 
        for (int i = 0; i < fil; i++) {
           tabl[i][0]=String.valueOf(3);
           tabl[i][col-1]=String.valueOf(3);
           for (int j = 0; j < col; j++) {
               tabl[0][j]=String.valueOf(3);
               tabl[fil-1][j]=String.valueOf(3);
                
            }
           
        } 
         
        // llena aleatoriamente de pared  rompible e irrompible      
        Random numAleatorio = new Random ();
        for (int i = 1; i < fil-1; i++) {        
            for (int j=1;j< col-1;j++){ 
                    tabl[i][j] =String.valueOf(numAleatorio.nextInt(2)+1) ;   
                }
                
            
            }
        
        
        
       
      
    //pone los jugadores en el tablero 
         
        tabl[1][1]="A";
        tabl[fil-2][1]="B";
        tabl[1][col-2]="C";
        tabl[fil-2][col-2]="D";
        
//int fil=28;
//int col=36;
        return tabl;
    }
}