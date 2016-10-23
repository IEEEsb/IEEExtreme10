package com.assistantindustries;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * Created by assistant on 22/10/16.
 */
public class Pintura {

    static Boolean[][] canvas;

    public static double solve(int size, List<Ellipse> ellipses) {
        long pointsClear = 0;

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                boolean found = false;
                for (Ellipse elip : ellipses) {
                    if (elip.contains(new Point(i, j))) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    pointsClear++;
                }
            }
        }
        return ((double) pointsClear) / ((double) (size * size));
    }

    public static void main(String[] args) {
        int size = 1000;
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        int state = 0;
        while (sc.hasNextLine()) {
            line = sc.nextLine();
            int ellipCount = 0;
            List<Ellipse> ellipses = new ArrayList<Ellipse>();
            switch (state) {
                case 0:
                    ellipCount = Integer.parseInt(line);
                    state = 1;
                    break;
                case 1:
                    int[] attrs = new int[5];
                    int count = 0;
                    for (String split : line.split(" ")) {
                        attrs[count] = size/100*(Integer.parseInt(split));
                        count++;
                    }

                    ellipses.add(new Ellipse(attrs[4],new Point(size/100*50+attrs[0],size/100*50+attrs[1]),
                            new Point(size/100*50+attrs[2],size/100*50+attrs[3])));
                    if (ellipCount == ellipses.size()) {
                        state = 0;
                        double solution = solve(size, ellipses);
                        System.out.println(Math.round(solution * 100) + "%");
                    }
                    break;
            }
        }
    }

    public static class Point {
        double x;
        double y;

        public Point(double x, double y) {
            this.x = x;
            this.y = y;
        }

        public double distance(Point another) {
            double ycoord = Math.abs(this.y - another.y);
            double xcoord = Math.abs(this.x - another.x);
            return Math.sqrt((ycoord) * (ycoord) + (xcoord) * (xcoord));
        }
    }

    public static class Ellipse {
        double axis;
        Point foci1;
        Point foci2;

        public Ellipse(double axis, Point foci1, Point foci2) {
            this.axis = axis;
            this.foci1 = foci1;
            this.foci2 = foci2;
        }

        public boolean contains(Point another) {
            return another.distance(foci1) + another.distance(foci2) < axis;
        }
    }
}
