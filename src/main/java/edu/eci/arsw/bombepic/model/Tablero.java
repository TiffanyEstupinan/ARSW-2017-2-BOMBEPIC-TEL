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
    public static int obstaculo;
    public  static String[][] tabl;
    
    
    public static String [][] tablero() throws IOException{
        
        int fil=26;
        int col=37;
        tabl=new String[fil][col];
        
      
         obstaculo=3;
               
        Random numAleatorio = new Random ();
        for (int i = 0; i < fil; i++) {
            for (int j=0;j< col;j++){
                    tabl[i][j] =String.valueOf(numAleatorio.nextInt(3)+1) ;   
                }
                
            
            }
        tabl[0][0]="A";
        tabl[25][0]="B";
        tabl[0][36]="C";
        tabl[25][36]="D";
        
//        FileReader file=null;
//        
//        
//        
//        try{
//            String x;
//            file= new FileReader("tablero.txt");
//            
//            BufferedReader b= new BufferedReader(file);
//            int i=0;
//            x=b.readLine();
//            String [] cadena=x.split(" ");
//            
//            int filas=Integer.valueOf(cadena[0]);
//            int colu=Integer.valueOf(cadena[1]);
//            obstaculo=Integer.valueOf(cadena[2]);
//            
//            t1=new String[filas][colu];
//            for (int j = 0; j < filas; j++) {
//                
//                x=b.readLine();
//                cadena=x.split("\t");
//                for (int k = 0; k < cadena.length; k++) {
//                    t1[j][k]= cadena[k];
//                    System.out.println("haciendo tablero" + t1);
//                    
//                }
//                
//            }
//            b.close();
//        } catch (FileNotFoundException ex) {
//            Logger.getLogger(Tablero.class.getName()).log(Level.SEVERE, null, ex);
//        }
        return tabl;
    }
}
