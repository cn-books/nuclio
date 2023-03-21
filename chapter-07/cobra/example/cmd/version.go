package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(versionCmd)
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of example",
	Long:  `All software has versions. This is example's`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("example version  v1.0 -- HEAD")
	},
}
