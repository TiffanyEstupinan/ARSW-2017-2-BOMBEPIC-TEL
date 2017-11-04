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
public class InformacionJuego {
    String name;
    String info;

    
    public InformacionJuego(){}
    
    public InformacionJuego(String name, String nick) {
        this.name = name;
        this.info = info;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNick() {
        return info;
    }

    public void setNick(String info) {
        this.info = info;
    }
    
    
    
    
    
    
}
