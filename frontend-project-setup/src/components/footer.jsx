import { Box, Typography } from "@material-ui/core";

export default function Footer({version = ""}) {
  return (
    <Box
      component="footer"
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        opacity: 0.9,
        zIndex: 1300,
      }}
      py={1}
      px={2}
    >
      <Typography variant="caption">
        © {new Date().getFullYear()} - version - {version}
      </Typography>
    </Box>
  );
}
