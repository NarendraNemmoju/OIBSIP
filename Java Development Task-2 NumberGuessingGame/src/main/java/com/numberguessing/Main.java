package com.numberguessing;

import javax.swing.*;
import java.awt.*;
import java.util.Random;

public class Main {

    static int secretNumber;
    static int attempts;
    static int round = 1;

    static int maxNumber = 100;
    static int maxAttempts = 7;

    static JTextArea scoreArea;

    public static void main(String[] args) {

        JFrame frame = new JFrame("Number Guessing Game");
        frame.setSize(600, 650);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);

        JPanel panel = new JPanel();
        panel.setBorder(BorderFactory.createEmptyBorder(20, 30, 20, 30));
        panel.setLayout(new GridLayout(12, 1, 10, 10));

        // Title
        JLabel titleLabel = new JLabel("NUMBER GUESSING GAME");
        titleLabel.setHorizontalAlignment(SwingConstants.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 26));

        // Round
        JLabel roundLabel = new JLabel("Round: 1");
        roundLabel.setHorizontalAlignment(SwingConstants.CENTER);
        roundLabel.setFont(new Font("Arial", Font.BOLD, 18));

        // Difficulty
        JLabel difficultyLabel = new JLabel("Select Difficulty");
        difficultyLabel.setHorizontalAlignment(SwingConstants.CENTER);
        difficultyLabel.setFont(new Font("Arial", Font.BOLD, 15));

        String[] difficulties = {
                "Easy",
                "Medium",
                "Hard"
        };

        JComboBox<String> difficultyBox =
                new JComboBox<>(difficulties);

        difficultyBox.setFont(
                new Font("Arial", Font.PLAIN, 15)
        );

        // Instructions
        JLabel instructionLabel = new JLabel(
                "Guess a number between 1 and 100"
        );

        instructionLabel.setHorizontalAlignment(
                SwingConstants.CENTER
        );

        instructionLabel.setFont(
                new Font("Arial", Font.PLAIN, 15)
        );

        // Guess input
        JTextField guessField = new JTextField();

        guessField.setFont(
                new Font("Arial", Font.PLAIN, 18)
        );

        guessField.setHorizontalAlignment(
                SwingConstants.CENTER
        );

        // Guess button
        JButton guessButton = new JButton("GUESS");

        guessButton.setFont(
                new Font("Arial", Font.BOLD, 15)
        );

        // Play Again button
        JButton playAgainButton =
                new JButton("PLAY AGAIN");

        playAgainButton.setFont(
                new Font("Arial", Font.BOLD, 15)
        );

        playAgainButton.setEnabled(false);

        // Result
        JLabel resultLabel =
                new JLabel("Enter your guess");

        resultLabel.setHorizontalAlignment(
                SwingConstants.CENTER
        );

        resultLabel.setFont(
                new Font("Arial", Font.BOLD, 16)
        );

        // Attempts
        JLabel attemptsLabel =
                new JLabel("Attempts: 0 / 7");

        attemptsLabel.setHorizontalAlignment(
                SwingConstants.CENTER
        );

        attemptsLabel.setFont(
                new Font("Arial", Font.BOLD, 15)
        );

        // Score title
        JLabel scoreLabel =
                new JLabel("ROUND SUMMARY");

        scoreLabel.setHorizontalAlignment(
                SwingConstants.CENTER
        );

        scoreLabel.setFont(
                new Font("Arial", Font.BOLD, 16)
        );

        // Score area
        scoreArea = new JTextArea();

        scoreArea.setEditable(false);

        scoreArea.setFont(
                new Font("Arial", Font.PLAIN, 14)
        );

        scoreArea.setBorder(
                BorderFactory.createLineBorder(Color.GRAY)
        );

        // Add components
        panel.add(titleLabel);
        panel.add(roundLabel);
        panel.add(difficultyLabel);
        panel.add(difficultyBox);
        panel.add(instructionLabel);
        panel.add(guessField);
        panel.add(guessButton);
        panel.add(playAgainButton);
        panel.add(resultLabel);
        panel.add(attemptsLabel);
        panel.add(scoreLabel);
        panel.add(scoreArea);

        frame.add(panel);

        startNewRound();

        // Difficulty selection
        difficultyBox.addActionListener(e -> {

            if (!guessButton.isEnabled()) {
                return;
            }

            String difficulty =
                    (String) difficultyBox.getSelectedItem();

            setDifficulty(difficulty);

            instructionLabel.setText(
                    "Guess a number between 1 and "
                            + maxNumber
            );

            attemptsLabel.setText(
                    "Attempts: 0 / "
                            + maxAttempts
            );

            startNewRound();
        });

        // Guess button
        guessButton.addActionListener(e -> {

            try {

                int userGuess =
                        Integer.parseInt(
                                guessField.getText()
                        );

                if (userGuess < 1 ||
                        userGuess > maxNumber) {

                    resultLabel.setText(
                            "Enter a number between 1 and "
                                    + maxNumber
                    );

                    return;
                }

                attempts++;

                if (userGuess == secretNumber) {

                    resultLabel.setText(
                            "Correct! 🎉"
                    );

                    scoreArea.append(
                            "Round " + round +
                                    " — guessed in " +
                                    attempts +
                                    " attempts\n"
                    );

                    guessButton.setEnabled(false);
                    playAgainButton.setEnabled(true);

                } else if (attempts >= maxAttempts) {

                    resultLabel.setText(
                            "You Lost! Number was: "
                                    + secretNumber
                    );

                    scoreArea.append(
                            "Round " + round +
                                    " — Lost after " +
                                    maxAttempts +
                                    " attempts\n"
                    );

                    guessButton.setEnabled(false);
                    playAgainButton.setEnabled(true);

                } else if (userGuess > secretNumber) {

                    resultLabel.setText(
                            "Too High!"
                    );

                } else {

                    resultLabel.setText(
                            "Too Low!"
                    );
                }

                attemptsLabel.setText(
                        "Attempts: " +
                                attempts +
                                " / " +
                                maxAttempts
                );

                guessField.selectAll();

            } catch (NumberFormatException ex) {

                resultLabel.setText(
                        "Please enter a valid number!"
                );
            }
        });

        // Play Again
        playAgainButton.addActionListener(e -> {

            round++;

            startNewRound();

            roundLabel.setText(
                    "Round: " + round
            );

            attemptsLabel.setText(
                    "Attempts: 0 / " +
                            maxAttempts
            );

            resultLabel.setText(
                    "Enter your guess"
            );

            guessField.setText("");

            guessButton.setEnabled(true);
            playAgainButton.setEnabled(false);

            guessField.requestFocus();
        });

        frame.setVisible(true);
    }

    static void setDifficulty(String difficulty) {

        if (difficulty.equals("Easy")) {

            maxNumber = 50;
            maxAttempts = 10;

        } else if (difficulty.equals("Medium")) {

            maxNumber = 100;
            maxAttempts = 7;

        } else if (difficulty.equals("Hard")) {

            maxNumber = 200;
            maxAttempts = 5;
        }
    }

    static void startNewRound() {

        Random random = new Random();

        secretNumber =
                random.nextInt(maxNumber) + 1;

        attempts = 0;
    }
}