# Data Cleaning Using Python

## Project Overview

This project demonstrates professional data cleaning using Python, Pandas, and NumPy.

A deliberately messy customer dataset was created and systematically cleaned to make it ready for further data analysis.

## Objectives

- Identify missing values
- Detect and remove duplicate records
- Standardize inconsistent data
- Detect and handle outliers
- Correct data types
- Create a before-and-after data quality summary
- Save the cleaned dataset as a CSV file

## Technologies Used

- Python
- Pandas
- NumPy
- Jupyter Notebook
- VS Code

## Data Cleaning Steps

### 1. Missing Values

Missing Age and Purchase Amount values were handled using median imputation.

### 2. Duplicate Records

Duplicate records were identified and removed.

### 3. Data Standardization

Inconsistent Gender values such as `M`, `male`, `F`, and `female` were standardized to `Male` and `Female`.

### 4. Date Formatting

Purchase dates were converted into a consistent datetime format.

### 5. Invalid Values

An unrealistic age value was identified and corrected.

### 6. Outlier Detection

The IQR method was used to identify unusually high purchase amounts. The detected outlier was capped using the IQR upper bound.

### 7. Final Dataset

The cleaned dataset was saved as:

`cleaned_customer_data.csv`

## Project Files

- `Data_Cleaning.ipynb` — Jupyter Notebook containing the complete cleaning process
- `cleaned_customer_data.csv` — cleaned dataset
- `README.md` — project documentation

## Conclusion

The project successfully transformed a deliberately messy dataset into a clean and analysis-ready dataset by handling missing values, duplicates, inconsistent formatting, invalid values, outliers, and data types.