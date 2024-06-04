

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@SuppressWarnings("null")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String email = request.getParameter("umail");
		String pswd = request.getParameter("upswd");
		
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		
		PrintWriter writer = null;
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			String url = "jdbc:mysql://localhost:3306/register_db";
			String username = "root";
			String password = "rachbulice123...";
			
			int log = 1;
			connection = DriverManager.getConnection(url, username, password);
			statement = connection.createStatement();
			resultSet = statement.executeQuery("SELECT * FROM userDetails");
			
			writer = response.getWriter();
			
			while (resultSet.next()) {
				
				if (resultSet.getString("umail").equals(email) && resultSet.getString("upswd").equals(pswd)) {
					log = 0;
					break;
				}
			}
			
			if (log == 0) {
				writer.println("Login successful");
			} else {
				writer.println("Login failed!");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		finally {
			try {
				connection.close();
				statement.close();
				resultSet.close();
				writer.close();
			} catch(SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
