
import java.sql.*;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class RegisterServlet
 */
@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String fullName = request.getParameter("uname");
		String email = request.getParameter("umail");
		String pswd = request.getParameter("upswd");
		
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		
		PrintWriter writer = null;
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			String url = "jdbc:mysql://localhost:3306/register_db";
			String username = "root";
			String password = "rachbulice123...";
			connection = DriverManager.getConnection(url, username, password);
			preparedStatement = connection.prepareStatement("INSERT INTO userDetails (uname, umail, upswd) VALUES (?, ?, ?)");
			
			preparedStatement.setString(1, fullName);
			preparedStatement.setString(2, email);
			preparedStatement.setString(3, pswd);
			
			int rowsAffected = preparedStatement.executeUpdate();
			writer = response.getWriter();
			
			if (rowsAffected > 0) {
				writer.println("Registration successful!");
			} else {
				writer.println("Registration failed!");
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		finally {
			try {
				connection.close();
				preparedStatement.close();
				writer.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
