package com.assistantindustries;

import java.util.Scanner;

/**
 * Created by assistant on 22/10/16.
 */
public class Flowers {

    public static long solve(long size){
        long valueOfL = size - Long.highestOneBit(size);
        long safePosition = 2 * valueOfL  + 1;

        return safePosition;

    }

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        while(sc.hasNextLine()){
            System.out.println(solve(Long.parseLong(sc.nextLine())));
        }
    }
}
