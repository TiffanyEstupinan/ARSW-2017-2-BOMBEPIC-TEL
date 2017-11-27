/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.bombepic.model;

/**
 *
 * @author tiffany
 */
public class Sala {
    String [][] matriz;
    int puntos;
    int [] vidas= new int [4];


    

    public String[][] getMatriz() {
        return matriz;
    }

    public void setMatriz(String[][] matriz) {
        this.matriz = matriz;
    }

    public int getPuntos() {
        return puntos;
    }

    public void setPuntos(int puntos) {
        this.puntos = puntos;
    }

    public int[] getVidas() {
        return vidas;
    }

    public void setVidas(int[] vidas) {
        this.vidas = vidas;
    }

    public Sala(String[][] matriz, int puntos ) {
        this.matriz = matriz;
        this.puntos=puntos; 
        for (int i=0 ; i<4 ;i++){
            vidas[i]=2;
        }
        
    }
    
    public Sala(){}

}
